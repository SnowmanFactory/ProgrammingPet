const punc = /[^\w\s]|_/g;
const space = /\s+/g
const htmlreg = /\bh\s*t\s*m\s*l\b/

function html(msg) {
    let message = msg.content.replace(punc, "").replace(space , " ").toLowerCase();
    if (message.match(htmlreg) && msg.author.bot != true) {
        msg.react('🚫')
    }
}

exports.html = html;