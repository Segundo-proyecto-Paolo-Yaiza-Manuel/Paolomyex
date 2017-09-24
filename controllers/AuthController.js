module.exports = {
  signup: (req, res, next) => {
    res.render("auth/signup")
  },
  login: (req, res) => {
      res.render('auth/login')
  },
  logout: (req, res, next) => {
    req.logout()
    res.redirect('/../')
  }
}
