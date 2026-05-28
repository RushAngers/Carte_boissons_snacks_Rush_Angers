# 🔥 Configuration Firebase - Rush Angers

## ✅ Configuration Complète

Votre configuration Firebase est maintenant intégrée ! 

### Clés Firebase Configurées ✓
- ✅ projectId: `carte-rush-angers`
- ✅ databaseURL: Base de données Europe (rapide)
- ✅ API Key: Active

---

## 🔐 Configuration des Règles de Sécurité (IMPORTANT!)

**Étape 1 :** Allez sur https://console.firebase.google.com  
**Étape 2 :** Sélectionnez le projet `carte-rush-angers`  
**Étape 3 :** Menu gauche → **Realtime Database** → onglet **Règles**  
**Étape 4 :** Remplacez tout par ce code :

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "carte": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

**Étape 5 :** Cliquez **"Publier"**

### Explication des règles :
- ✅ **Tout le monde peut LIRE** la carte (les visiteurs voient les mises à jour)
- 🔒 **Seuls les utilisateurs connectés peuvent MODIFIER** (protection)

---

## 🚀 Comment ça fonctionne

### Mode Normal (Lecture)
1. Visiteur ouvre le site
2. Les données se chargent depuis Firebase
3. Tout le monde voit la même version à jour

### Mode Édition (Modification)
1. Cliquez sur "✏️ Modifier"
2. Entrez le mot de passe
3. Modifiez prix, textes, photos
4. Cliquez sur "✅ Terminer"
5. **Les données se sauvegardent automatiquement sur Firebase** 🔄
6. **Tous les visiteurs voient les changements en temps réel** ✨

---

## 🧪 Tester la Synchronisation

1. **Ouvrez votre site dans 2 onglets/navigateurs**
2. **Sur le 1er onglet :** Mode édition → Changez un prix
3. **Cliquez "Terminer"**
4. **Allez sur le 2e onglet** → Vérifiez que le changement est visible ✅

---

## 📊 Vérifier les données sur Firebase

1. Allez sur https://console.firebase.google.com
2. Projet `carte-rush-angers` → **Realtime Database**
3. Vous verrez l'arborescence :
   ```
   carte
   ├── html: (le contenu complet de votre page)
   ├── lastUpdated: "2024-05-28T..."
   └── lastUpdatedBy: "RushAngers-User"
   ```

---

## ⚠️ Notes Importantes

- **Les images sont stockées en Base64** : Le système encode les images directement dans la base de données
- **Limite Firebase** : Gratuit jusqu'à 100 connexions simultanées
- **Backup automatique** : Firebase sauvegarde vos données
- **Pas d'authentification pour cette version** : N'importe qui peut modifier. À améliorer plus tard si besoin

---

## 🔧 Fichiers Utilisés

- `firebase-config.js` : Configuration Firebase (clés API)
- `firebase-sync.js` : Synchronisation en temps réel
- `index.html` : Intègre les 2 fichiers ci-dessus

---

## 🎉 Vous êtes Prêt(e) !

Testez maintenant votre site avec la synchronisation Firebase active. Toutes les modifications doivent être instantanément visibles pour tous les visiteurs ! 🚀
