export function initializeTwitchEmbeds() {
  const streamerChannel = "rorolebateau";
  const parentDomain = "jeurorofrontend.vercel.app";

  new Twitch.Embed("twitch-embed", {
    width: "100%",
    height: "100%",
    channel: streamerChannel,
    layout: "video",
    parent: [parentDomain],
  });
}
