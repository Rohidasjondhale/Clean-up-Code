const fs = require('fs');

const reqestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {

        res.setHeader('Content-Type', 'text/html');

        res.end(`

            <form action="/message" method="POST">
                <label>Name</label>
                <input type="text" name="username"/>
                <button type="submit">Add</button>
            </form>

        `);
    }else
    {
        if (req.url === '/message') {

            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);
            });
            req.on('end', () => {
                body = Buffer.concat(body);
                let formData = body.toString();
                const formValue = formData.split('=')[1];
                fs.writeFile('formValues.txt', formValue, err => {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                })

    }) ;
}
else{
    if(req.url === '/read'){
        fs.readFile('formValues.txt', (err, data) => {
            console.log(data.toString());
            res.end(
                `
                </h1>${data.toString()}</h1>
                `)
         });     
    }
}

}
}
const anotherFunction = () => {
    console.log('This is another function');
}

module.exports = reqestHandler;
module.exports.testFunction = anotherFunction;
