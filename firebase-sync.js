// ══════════════════════════════════════
// SYNCHRONISATION FIREBASE EN TEMPS RÉEL
// ══════════════════════════════════════

let lastSavedContent = '';
let isSyncing = false;

// Charger les données depuis Firebase au démarrage
function loadDataFromFirebase() {
  carteRef.once('value', snapshot => {
    if (snapshot.val() && snapshot.val().html) {
      console.log('📥 Données chargées depuis Firebase');
      const data = snapshot.val();
      lastSavedContent = data.html;
      // On ne remplace pas le HTML au chargement pour éviter les conflits
      // La version locale est la source de vérité
    } else {
      console.log('ℹ️ Première utilisation - sauvegarde initiale');
      saveDataToFirebase();
    }
  });
}

// Sauvegarder les données vers Firebase
function saveDataToFirebase() {
  if (isSyncing) return; // Éviter les sauvegarde en cascade
  
  isSyncing = true;
  const carteBody = document.body.innerHTML;
  const timestamp = new Date().toISOString();
  
  carteRef.set({
    html: carteBody,
    lastUpdated: timestamp,
    lastUpdatedBy: 'RushAngers-User'
  }).then(() => {
    console.log('✅ Données sauvegardées sur Firebase');
    lastSavedContent = carteBody;
    isSyncing = false;
    toast('✅ Modifications synchronisées');
  }).catch(error => {
    console.error('❌ Erreur lors de la sauvegarde Firebase :', error);
    isSyncing = false;
    toast('⚠️ Erreur de synchronisation');
  });
}

// Écouter les changements en temps réel (pour les autres navigateurs)
function listenForChanges() {
  carteRef.on('value', snapshot => {
    if (snapshot.val() && snapshot.val().html) {
      const data = snapshot.val();
      // Vérifier si les changements viennent de notre navigateur
      if (data.html !== lastSavedContent && !editMode) {
        console.log('🔄 Mise à jour détectée depuis un autre navigateur');
        // Les changements seront visibles au prochain rechargement ou on peut faire :
        // location.reload(); // Décommenter pour rechargement auto
      }
    }
  });
}

// Initialiser Firebase au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Vérifier que Firebase est bien chargé
    if (typeof firebase === 'undefined') {
      console.error('❌ Firebase n\'est pas chargé. Vérifiez les imports CDN.');
      return;
    }
    
    loadDataFromFirebase();
    listenForChanges();
    console.log('🟢 Système de synchronisation Firebase activé');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation Firebase :', error);
  }
});