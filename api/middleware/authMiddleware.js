const isAdmin = function (req, res, next) {
    if (!req.role) return res.sendStatus(401);
    if (req.role == 'admin')
        next();
};

const isStaff = function (req, res, next) {
    if (!req.role) return res.sendStatus(401);
    if (req.role == 'staff')
        next();
};

const isCustomer = function (req, res, next) {
    if (!req.role) return res.sendStatus(401);
    if (req.role == 'customer')
        next();
};

module.exports = { isAdmin, isStaff, isCustomer };