'use strict';

const APIdoc = {
        titulo:"Documentação",
        topicos:{
            APIs:{
                documentos:{
                    verbo:"GET",
                    rota:"http(s)://url:8191",
                    notas:"Pode ser visualizado no navegador em formatação HTML"
                },
                rotas:{
                    aviso: "Todas as requisições do CRUD devem ser autenticadas pela header Authorization (exceto cadastro de usuário e sua autenticação [login])",
                    cadastroLogin:{
                        verbo:"POST",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/auth/register",
                        parametros:{
                            corpoHTML:['name', 'email', 'RG', 'CPF', 'birthDate', 'dependents', 'password']
                        }
                    },
                    autenticar:{
                        verbo:"POST",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/auth/authenticate",
                        parametros:{
                            corpoHTML:['email','password']
                        }
                    },
                    verTudo:{
                        verbo:"GET",
                        rota:"http(s)://url:8191/cad"
                    },
                    verTodosxEnderecos:{
                        verbo:"GET",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad/:id/addresses",
                        parametros:'id'
                    },
                    verTodosxPlanos:{
                        verbo:"GET",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad/:id/plan",
                        parametros:'id'
                    },
                    verTodosFiltroCamposUsuario:{
                        verbo:"POST",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad/:filtersval/filter",
                        parametros:{
                            rota:'filtersval',
                            corpoHTML:[ 'name', 'email', 'RG', 'CPF', 'birthDate', 'dependents' ]
                        }
                    },
                    verTodosRelacionamentosCondicional:{
                        verbo:"POST",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad/:relations/where",
                        parametros:{
                            rota:{
                                relations:"Relações: sepearar por |"
                            },
                            corpoHTML:{
                                parametro:['...'],
                                tipo:"Quaisquer campos das relações inclusas"
                            }
                        }
                    },
                    cadastrarEnderecos:{
                        verbo:"POST",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad/:id/addresses",
                        parametros:{
                            corpoHTML:['street', 'zipcode', 'number', 'neighborhood', 'city', 'state']
                        }
                    },
                    vincularPlano:{
                        verbo:"POST",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad/:id/plan",
                        parametros:{
                            corpoHTML:'planSelected',
                            tipo: 'Número inteiro',
                            valores: {
                                Basic:1,
                                Standard:2,
                                Premium:3
                            }
                        }
                    },
                    uploadFotoPerfil:{
                        verbo:"POST",
                        metodo:"multiform-data",
                        rota:"http(s)://url:8191/cad/uploads",
                        parametros:{
                            formulario:{
                                parametro:'file',
                                tipo:'Arquivo'
                            }
                        }
                    },
                    atualizarUsuario:{
                        verbo:"PATCH",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad",
                        parametros:{
                            rota:'id',
                            corpoHTML:{
                                parametros:['name', 'email', 'RG', 'CPF', 'birthDate', 'dependents', 'password'],
                                tipo: 'Palo menos um obrigatório e os demais opicionais'
                            }
                        }
                    },
                    excluirUsuario:{
                        verbo:"DELETE",
                        metodo:"JSON",
                        rota:"http(s)://url:8191/cad",
                        parametros:{
                            corpoHTML:'id'
                        }
                    }
                }
            }
        }
    };
module.exports = async (req,res) => {
if(!/html/i.test(req.headers.accept))
    return res.json(APIdoc);
let list = '', c = true, p;
const deepmap = (o) => {
    if(o instanceof Object){
        list += '<ul>';
        for(let prop in o){
            c = isNaN(prop);
            if(c)
                list += `<li>${prop}`;
            else
                list += `<li>`;
            p = o[prop];
            deepmap(o[prop]);
        }
    }
    if(p instanceof Object){
        list += '<ul>';
        p = o;
    }
    if(o instanceof Object)
        list += '</ul>';
    else
        list += (c ? ': ' : '')+`${o}</li>`;
};
deepmap(APIdoc);
return res.send(`${list}</ul>`);
}
