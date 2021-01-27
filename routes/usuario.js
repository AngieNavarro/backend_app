const {
  Router
} = require('express');
const router = Router();
const crud = require('./models/crud.models');


router.get('/:id', async (req, res) => {
  let id = req.params.id;
  let usuario = await crud.findOne('usuario', 'usuario_id', id);
  res.json(usuario);
});

router.get('/', async (req, res) => {
  let usuario = await crud.maximo('usuario');
  console.log(usuario)
  res.json(usuario);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  crud.create('usuario', req.body)
    .then(data => res.status(200).json({
      "msg": "Usuario registrado correctamente"
    }))
    .catch(err => {
      console.log(err)
      res.status(400).json({
        "msg": "Error de registro"
      })
    });
});

router.post('/login', async (req, res) => {
  let usuario = req.body;
  console.log(usuario)
  if (usuario.length == 0) {
    res.status(400).json({
      'msg': 'Verifique los datos.'
    });
  }

  let lista2 = await crud.findAll('usuario');

  let data2 = lista2.filter(element2 => element2.correo === usuario.correo && element2.password === usuario.password_login)
  console.log(data2)
  // console.log(data2[0].habilitado)

  if (data2.length == 0) {
    res.status(400).json({
      'msg': 'Su correo o contraseña son incorrectos'
    });
  } else {
    if (data2[0].habilitado) {
      delete data2[0].password;
      res.json({
        ok: true,
        msg: data2
      });
    } else {
      res.status(400).json({
        'msg': 'Este usuario esta In-habilitado'
      });
    }

  }


});

router.put('/inhabilitar', async (req, res) => {
  req.body.habilitado = false;
  delete req.body.password;
  crud.update('usuario', req.body.usuario_id, req.body)
    .then(data => res.status(200).json({
      "msg": "Usuario inhabilitado correctamente"
    }))
    .catch(err => {
      console.log(err)
      res.status(400).json({
        "msg": "Error al inhabilitar"
      })
    });
})
router.put('/retiros', async (req, res) => {
  console.log(req.body)
  let usuario = await crud.findOne('usuario', 'cuenta', req.body.cuenta);
  console.log(usuario)
  let saldo_actual = 0
  saldo_actual = Number(usuario[0].monto) - Number(req.body.saldo);
  console.log(saldo_actual)
  usuario[0].monto = saldo_actual;
  crud.update('usuario', usuario[0].usuario_id, usuario[0])
    .then(data => res.status(200).json({
      "msg": "Retiro realizado correctamente"
    }))
    .catch(err => {
      console.log(err)
      res.status(400).json({
        "msg": "Error al Retirar"
      })
    });
})
router.put('/deposito', async (req, res) => {
  console.log(req.body)
  let usuario = await crud.findOne('usuario', 'cuenta', req.body.cuenta);
  console.log(usuario)
  let saldo_actual = 0
  saldo_actual = Number(usuario[0].monto) + Number(req.body.saldo);
  console.log(saldo_actual)
  usuario[0].monto = saldo_actual;
  crud.update('usuario', usuario[0].usuario_id, usuario[0])
    .then(data => res.status(200).json({
      "msg": "Deposito realizado correctamente"
    }))
    .catch(err => {
      console.log(err)
      res.status(400).json({
        "msg": "Error al Depositar"
      })
    });
});
router.put('/trasnferencia', async (req, res) => {
  console.log(req.body)
  // usuario a retirar
  let usuario_resta = await crud.findOne('usuario', 'cuenta', req.body.cuenta);
  let saldo_actual_resta = 0
  saldo_actual_resta = Number(usuario_resta[0].monto) - Number(req.body.saldo);
  usuario_resta[0].monto = saldo_actual_resta;
  let up = await crud.update('usuario', usuario_resta[0].usuario_id, usuario_resta[0]);
  console.log(up)
  // usuario a transfereir
  let usuario = await crud.findOne('usuario', 'cuenta', req.body.cuenta_externa);
  let saldo_actual = 0
  saldo_actual = Number(usuario[0].monto) + Number(req.body.saldo);
  usuario[0].monto = saldo_actual;
  crud.update('usuario', usuario[0].usuario_id, usuario[0])
    .then(data => res.status(200).json({
      "msg": "Transferencia realizado correctamente"
    }))
    .catch(err => {
      console.log(err)
      res.status(400).json({
        "msg": "Error al Trasnferir"
      })
    });
})

module.exports = router;