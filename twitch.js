function initializeTwitchEmbeds() {
  const streamerChannel = "rorolebateau"; // Changez ici pour le nom de la chaîne que vous voulez afficher
  const deployedDomain = "https://jeurorofrontend.vercel.app/";

  // Création du lecteur vidéo
  new Twitch.Embed("twitch-embed", {
    width: "100%",
    height: "100%",
    channel: streamerChannel,
    layout: "video",
    parent: [deployedDomain], // Requis par Twitch pour la sécurité
  });

  const chatContainer = document.getElementById("twitch-chat-embed");
  const chatIframe = document.createElement("iframe");

  // Utilisation de l'URL "popout" avec le paramètre "darkpopout"
  const chatURL = `https://www.twitch.tv/popout/${streamerChannel}/chat?darkpopout&parent=${deployedDomain}`;

  chatIframe.setAttribute("src", chatURL);
  chatIframe.setAttribute("height", "100%");
  chatIframe.setAttribute("width", "100%");

  chatContainer.innerHTML = "";
  chatContainer.appendChild(chatIframe);
}

// On attend que la page soit entièrement chargée pour initialiser les embeds
window.addEventListener("load", initializeTwitchEmbeds);
