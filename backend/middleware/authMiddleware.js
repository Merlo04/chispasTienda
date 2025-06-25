import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, rol, nombre }
    next();
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido' });
  }
}

export function soloAdmin(req, res, next) {
  if (req.user?.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso solo para administradores' });
  }
  next();
}