
(async () => {
    await new Promise(r => setTimeout(r, 5000));
    console.log("Play")
    document.getElementsByTagName('video')[0].play();
}
)();