// firebase-sync.js
// Synchronisation temps réel avec Firebase Realtime Database
// Ce fichier gère : lecture initiale, écoute des changements, écriture des modifications

// ─── Vérification que Firebase est bien chargé ───────────────────────────────
if (typeof firebase === 'undefined' || typeof db === 'undefined') {
  console.error('❌ Firebase non chargé. Vérifiez que firebase-config.js est bien inclus APRÈS les CDN Firebase dans index.html');
} else {
  console.log('✅ Firebase connecté');
  initFirebaseSync();
}

// ─── Référence racine dans la base ───────────────────────────────────────────
// Toutes les données de la carte sont stockées sous /carte dans Firebase
const REF = 'carte';

// ─── Initialisation principale ────────────────────────────────────────────────
function initFirebaseSync() {

  // 1. Écoute en temps réel : dès qu'une donnée change dans Firebase,
  //    on met à jour le DOM immédiatement pour TOUS les visiteurs
  db.ref(REF).on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log('🔄 Données reçues depuis Firebase, mise à jour de la carte...');
      applyDataToDOM(data);
    } else {
      console.log('ℹ️ Aucune donnée dans Firebase — affichage des valeurs par défaut du HTML');
    }
  }, (error) => {
    console.error('❌ Erreur lecture Firebase:', error.message);
  });
}

// ─── Appliquer les données Firebase au DOM ───────────────────────────────────
// Chaque élément éditable a un attribut data-firebase-key unique
// Firebase stocke {cle: valeur} et on met à jour le texte de l'élément correspondant
function applyDataToDOM(data) {
  Object.entries(data).forEach(([key, value]) => {
    const el = document.querySelector(`[data-fk="${key}"]`);
    if (el) {
      el.textContent = value;
    }
  });
}

// ─── Sauvegarder une modification vers Firebase ──────────────────────────────
// Appelée à chaque fois que l'utilisateur finit de modifier un champ (onblur)
function saveToFirebase(key, value) {
  if (typeof db === 'undefined') return;

  db.ref(`${REF}/${key}`).set(value)
    .then(() => {
      console.log(`✅ Sauvegardé: ${key} = "${value}"`);
      showToast('✅ Modifié pour tout le monde !');
    })
    .catch((error) => {
      console.error(`❌ Erreur écriture Firebase (${key}):`, error.message);
      showToast('❌ Erreur de sauvegarde — vérifiez les règles Firebase');
    });
}

// ─── Sauvegarder la suppression d'un produit ─────────────────────────────────
function deleteFromFirebase(key) {
  if (typeof db === 'undefined') return;
  db.ref(`${REF}/${key}`).remove()
    .then(() => console.log(`🗑️ Supprimé: ${key}`))
    .catch((err) => console.error('❌ Erreur suppression:', err.message));
}

// ─── Sauvegarder un nouveau produit ──────────────────────────────────────────
function saveNewProduct(gridId, nom, desc, prix) {
  if (typeof db === 'undefined') return;
  const key = `product_${gridId}_${Date.now()}`;
  db.ref(`${REF}/${key}_nom`).set(nom);
  db.ref(`${REF}/${key}_desc`).set(desc);
  db.ref(`${REF}/${key}_prix`).set(prix);
}
