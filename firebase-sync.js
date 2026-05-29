// firebase-sync.js
// Synchronisation temps réel avec Firebase Realtime Database

// ─── Référence racine — DOIT être déclarée EN PREMIER ────────────────────────
const REF = 'carte';

// ─── Vérification que Firebase est bien chargé ───────────────────────────────
if (typeof firebase === 'undefined' || typeof db === 'undefined') {
  console.error('❌ Firebase non chargé. Vérifiez les CDN dans index.html');
} else {
  console.log('✅ Firebase connecté');
  initFirebaseSync();
}

// ─── Écoute en temps réel ────────────────────────────────────────────────────
function initFirebaseSync() {
  db.ref(REF).on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log('🔄 Mise à jour depuis Firebase...');
      applyDataToDOM(data);
    } else {
      console.log('ℹ️ Firebase vide — valeurs HTML par défaut affichées');
    }
  }, (error) => {
    console.error('❌ Erreur lecture Firebase:', error.message);
  });
}

// ─── Appliquer les données Firebase au DOM ───────────────────────────────────
function applyDataToDOM(data) {
  Object.entries(data).forEach(([key, value]) => {
    const el = document.querySelector(`[data-fk="${key}"]`);
    if (el) el.textContent = value;
  });
}

// ─── Sauvegarder une modification vers Firebase ──────────────────────────────
function saveToFirebase(key, value) {
  if (typeof db === 'undefined') return;
  db.ref(`${REF}/${key}`).set(value)
    .then(() => {
      console.log(`✅ Sauvegardé: ${key} = "${value}"`);
      toast('✅ Modifié pour tout le monde !');
    })
    .catch((error) => {
      console.error(`❌ Erreur Firebase (${key}):`, error.message);
      toast('❌ Erreur — vérifiez les règles Firebase');
    });
}

// ─── Supprimer une clé Firebase ──────────────────────────────────────────────
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
