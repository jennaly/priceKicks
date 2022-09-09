module.exports = {
    getIndex: (req, res) => {
        res.header('Cache-Control', 'no-cache')
        res.render('index')
    }
}