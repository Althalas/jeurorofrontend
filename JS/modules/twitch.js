export function initializeTwitchEmbeds() {
  const streamerChannel = "rorolebateau"; // Changez ici pour le nom de la chaîne que vous voulez afficher
  const parentDomain = window.location.hostname; // On utilise le domaine actuel pour le paramètre parent

  console.log("Domaine détecté pour l'intégration Twitch:", parentDomain);

  // Création du lecteur vidéo
  new Twitch.Embed("twitch-embed", {
    width: "100%",
    height: "100%",
    channel: streamerChannel,
    layout: "video",
    parent: [parentDomain], // Requis par Twitch pour la sécurité
  });
}

// On attend que la page soit entièrement chargée pour initialiser les embeds
window.addEventListener("load", initializeTwitchEmbeds);
