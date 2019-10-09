const password_abstract = {}

password_abstract.random = () =>{
     //const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomNumber = 0;
    for (let i = 1; i < 5; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }
        return randomNumber;
};

password_abstract.numero_saltos = () =>{
    return 10;
}

module.exports = password_abstract;