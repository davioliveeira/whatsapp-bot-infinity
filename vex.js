const makeWaSocket = require('@adiwajshing/baileys').default
const { delay, DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState, } = require('@adiwajshing/baileys')
const { unlink, existsSync, mkdirSync } = require('fs');
const P = require('pino');
const fs = require('fs');
const mysql = require('mysql2/promise');



const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    });
}
const getUser = async (msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT user FROM pedido WHERE user = ?', [msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.length > 0) return true;
    return false;
}
const setUser = async (msg, nome) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('INSERT INTO `pedido` (`id`, `user`, `nome`, `local`, `pessoas`,`dataEvento`,`pacote`) VALUES (NULL, ?, ?, "", "","","")', [msg, nome]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.length > 0) return rows[0].user;
    return false;
}
// GROUP PESSOAS 
const getPessoas = async (msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT pessoas FROM pedido WHERE user = ?', [msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.length > 0) return rows[0].pessoas;
    return false;
}
const setPessoas = async (pessoas, msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET pessoas = ? WHERE pedido.user = ?;', [pessoas, msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });

    if (rows.affectedRows > 0) return true;
    return false;
}
const delPessoas = async (msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET pessoas = "" WHERE pedido.user = ?;', [msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.affectedRows > 0) return true;
    return false;
}
//GROUP DATA
const getdata = async (msg) =>{
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT dataEvento FROM pedido WHERE user = ?', [msg]);
    delay(1000).then(async function () {
         await connection.end();
         delay(500).then(async function () {
             connection.destroy();
         });
     });
     if (rows.length > 0) return rows[0].dataEvento;
     return false;   
}
const setData = async (data, msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET dataEvento = ? WHERE pedido.user = ?;', [data, msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });

    if (rows.affectedRows > 0) return true;
    return false;
}
const delData = async (msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET dataEvento = "" WHERE pedido.user = ?;', [msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.affectedRows > 0) return true;
    return false;
}
// GROUP LOCAL 
const getLocal = async (msg) =>{
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT local FROM pedido WHERE user = ?', [msg]);
    delay(1000).then(async function () {
         await connection.end();
         delay(500).then(async function () {
             connection.destroy();
         });
     });
     if (rows.length > 0) return rows[0].local;
     return false;   
}
const setLocal = async (local, msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET local = ? WHERE pedido.user = ?;', [local, msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });

    if (rows.affectedRows > 0) return true;
    return false;
}
const delLocal = async (msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET local = "" WHERE pedido.user = ?;', [msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.affectedRows > 0) return true;
    return false;
}
// GROUP PACOTE
const getPacote = async (msg) =>{
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT pacote FROM pedido WHERE user = ?', [msg]);
    delay(1000).then(async function () {
         await connection.end();
         delay(500).then(async function () {
             connection.destroy();
         });
     });
     if (rows.length > 0) return rows[0].pacote;
     return false;   
}
const setPacote = async (pacote, msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET pacote= ? WHERE pedido.user = ?;', [pacote, msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });

    if (rows.affectedRows > 0) return true;
    return false;
}
const delPacote = async (msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET pacote = "" WHERE pedido.user = ?;', [msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.affectedRows > 0) return true;
    return false;
}
//DELETA TUDO!
const delAll = async (msg) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('UPDATE pedido SET dataEvento= "", local= "", pacote= "", pessoas = "" WHERE pedido.user = ?;', [msg]);
    delay(1000).then(async function () {
        await connection.end();
        delay(500).then(async function () {
            connection.destroy();
        });
    });
    if (rows.affectedRows > 0) return true;
    return false;
}


const GroupCheck = (jid) => {
    const regexp = new RegExp(/^\d{18}@g.us$/)
    return regexp.test(jid)
}

const Update = (sock) => {
    sock.on('connection.update', ({ connection, lastDisconnect, qr }) => {
        if (qr){
           console.log('?? BOT - Qrcode: ', qr);
        };
        if (connection === 'close') {
           const Reconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
           if (Reconnect) Connection()
           console.log(`?? BOT - CONEX??O FECHADA! RAZ??O: ` + DisconnectReason.loggedOut.toString());
           if (Reconnect === false) {
              fs.rmSync('vex', { recursive: true, force: true });
              const removeAuth = 'vex'
              unlink(removeAuth, err => {
                 if (err) throw err
              })
           }
        }
        if (connection === 'open'){
           console.log('?? BOT - CONECTADO')
        }
     })
}

async function Connection() {
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState('vex');
    const config = {
        auth: state,
        logger: P({ level: 'error' }),
        printQRInTerminal: true,
        version,
        connectTimeoutMs: 60000,
        auth: state,
        async getMessage(key) {
            return { conversation: 'vex' };
        },
    };
    const sock = makeWaSocket(config);
    Update(sock.ev);
    sock.ev.on('creds.update', saveCreds);

    const SendMessage = async (jid, msg) => {
        await sock.presenceSubscribe(jid);
        await delay(2000);
        await sock.sendPresenceUpdate('composing', jid);
        await delay(1500);
        await sock.sendPresenceUpdate('paused', jid);
        return await sock.sendMessage(jid, msg);
    };


    sock.ev.on('messages.upsert', async ({ messages, type }) => {

        const msg = messages[0];
        const jid = msg.key.remoteJid;
        const cliente = msg.pushName
        const atendente = '558588364324@s.whatsapp.net'
        


        try {
            const nomeContato = msg.pushName;
            const user = msg.key.remoteJid;
            const getUserFrom = await getUser(user);

            if (getUserFrom === false) {
                await setUser(user, nomeContato);
                  console.log('Usu??rio armazenado: ' + user + ' - ' + nomeContato)
            }

            if (getUserFrom !== false) {
                
                // console.log('Usu??rio j?? foi armazenado')
            }
        }
        catch (e) {
            console.log('N??o foi poss??vel armazenar o usu??rio' + e)
        }

        if (!msg.key.fromMe && jid !== 'status@broadcast' && !GroupCheck(jid) && !msg.message.audioMessage) {
            sock.readMessages(jid, msg.key.participant, [msg.key.id]);
            console.log("MENSAGEM : ", msg)
            //================= ??REAS DE BUTTONS =============//
            const opcoes = [{ buttonId: 'orcamento', buttonText: { displayText: 'Solicitar Or??amento' }, type: 1.0 },{ buttonId: 'atendente', buttonText: { displayText:'Redes Sociais'}, type: 1.2 },];
            const confirma = [{buttonId:'sair', buttonText:{displayText:'Confirmar Solicita????o'}},]
            //======================================================//
            
            // TRATANDO RESPONSES TEXTS
            if(msg.message.conversation ){
                if(msg.message.conversation === 'oi' || 'ola' || 'ol??'){
                // if (msg.message.conversation.toLocaleLowerCase() === 'oi' ||msg.message.conversation.toLowerCase() === 'ol??' ||msg.message.conversation.toLowerCase() === 'boa noite' ||msg.message.conversation.toLowerCase() === 'bom dia' ||msg.message.conversation.toLowerCase().includes('boa tarde')||msg.message.conversation.toLowerCase().includes('ei') ||msg.message.conversation.toLowerCase() === 'ola'  && msg.message.conversation.toLowerCase() !== "data:") {
                        const btn_boasvindas = {
                            text: `Ol??, *${cliente}* seja bem-vindo!\n\nAqui ?? o Merlin ?????????????????????, atendente virtual do Mago dos Drinks????!  Para poder te atender da melhor forma, por favor selecione uma das op????es abaixo:`,
                            footer: '?? Mago Dos Drinks ?????????????????????',
                            buttons: opcoes,
                            headerType: 1
                        };
                        await SendMessage(jid, btn_boasvindas)
                    }
                if(msg.message.conversation.toLocaleLowerCase().includes('data:')){ // endere??o: Avenida. Carai                    
                        const fullData = msg.message.conversation.split(':')
                        const data = fullData[1]
                        delay(500).then(async function(){
                            await setData(data,jid)
                            console.dir(setData)
                        })
                        delay(1000).then(async function(){
                            const qntPessoas = await getPessoas(jid)
                            const localEvento = await getLocal(jid)
                            const pacote = await getPacote(jid)
                            const dataEvento = await getdata(jid)
                            const progress = {
                                text: `*INFORMA????ES DO SEU EVENTO:*\n??????Quantidade de Convidados:\n${qntPessoas}\n??????Local do Evento:\n${localEvento}\n??????Data do Evento:\n${dataEvento}\n??????Pacote:\n${pacote}`, 
                            }
                        await SendMessage(jid,progress)    
                        });
                        
                        delay(2000).then(async function () {
                            const pacoteEvento = [
                                {
                                    title: 'PACOTES DISPON??VEIS',
                                    rows: [
                                        {title: 'Pacote - Basic',},
                                        {title: 'Pacote - Basic + CHOPP',},
                                        {title: 'Pacote - Medium',},
                                        {title: 'Pacote - Medium + CHOPP',},
                                        {title: 'Pacote - Premium',},
                                        {title: 'Pacote - Premium + CHOPP',},
                                        {title: 'Pacote - Chopp',},
                                    ]
                                }
                            ]
                            const pacote = {
                                text:'Por fim, clique no link abaixo e verifique os nossos *Pacotes*.\n\n????????https://tinyurl.com/mago-dos-drinks-pacotes\n\n_*Obs.:* Ap??s verificar o link basta clicar em escolher o pacote desejado.?????????????????????_',
                                buttonText: 'CLIQUE AQUI PARA ESCOLHER',
                                footer: '?? Mago Dos Drinks ?????????????????????',
                                sections: pacoteEvento
                            }
                            SendMessage(jid,pacote)
                        })
                        
                    }
                if(msg.message.conversation.toLocaleLowerCase().includes('end:')){
                        const fullEndere??o = msg.message.conversation.split(':')
                        const endere??o = fullEndere??o[1]
                        delay(500).then(async function(){
                            await setLocal(endere??o,jid)
                            console.dir(setLocal)
                        })
                        delay(1000).then(async function(){
                            const qntPessoas = await getPessoas(jid)
                            const localEvento = await getLocal(jid)
                            const pacote = await getPacote(jid)
                            const dataEvento = await getdata(jid)
                            const progress = {
                                text: `*INFORMA????ES DO SEU EVENTO:*\n??????Quantidade de Convidados:\n${qntPessoas}\n??????Local do Evento:\n${localEvento}\n??????Data do Evento:\n${dataEvento}\n??????Pacote:\n${pacote}`, 
                            }
                            await SendMessage(jid,progress)    
                        });
                        delay(2000).then(async function () {
                            const local = {
                                text:'Estamos quase l??, informe a *Data* na qual ser?? realizado seu Evento.\n(Ex: " *Data:* 23/03/2023")\n\n_Obs.: Por favor siga o modelo informado no exemplo, colocando antes "*Data:*".?????????????????????_'
                            }
                            await SendMessage(jid,local)
                        })

                    }
        }

            // TRATANDO RESPONSES BUTTONS
            if (msg.message.buttonsResponseMessage) {
                    if(msg.message.buttonsResponseMessage.selectedDisplayText === 'Solicitar Or??amento'){
                        await delAll(jid)
                        const msg1 = {text:'Massa! Ent??o vamos l??! Vou te encaminhar apenas algumas perguntas para facilitar o seu atendimento!'}
                        await SendMessage(jid,msg1)
                        
                        const sec_juices = [
                            {
                               title: 'QUANTIDADE DE PESSOAS',
                               rows: [
                                { title: '50 pessoas'},
                                { title: '100 pessoas'},
                                { title: '150 pessoas'},
                                { title: '200 pessoas'},
                                { title: '250 pessoas'},
                                { title: '300 pessoas'},
                                { title: '+350 pessoas'},
                            ]
                        }] 
                        const listJuices = {
                            title: `${cliente},`,
                            text:`Por favor, selecione abaixo a *Quantidade de Convidados* do seu evento.\n\n_*Obs.:* Se n??o houver a op????o desejada basta selecionar a que mais aproxima-se ?? sua necessidade!._?????????????????????`,
                            buttonText: 'CLIQUE AQUI PARA ESCOLHER',
                            footer: '?? Mago Dos Drinks ?????????????????????',
                            sections: sec_juices
                         }

                        await SendMessage(jid,listJuices).then(result => console.log('RESULT: ', result))
                        .catch(err => console.log('ERROR: ', err))
                    }
                    if(msg.message.buttonsResponseMessage.selectedDisplayText === 'Confirmar Solicita????o'){
                        delay(500).then(async function(){
                            SendMessage(jid, {text:'Solicita????o de or??amento finalizada e enviada para um atendente Mago ?????????????????????! '})
                        })
                        delay(1000).then(async function(){
                            const num_cliente = jid.replace('@s.whatsapp.net', '')
                            const qntPessoas = await getPessoas(jid)
                            const localEvento = await getLocal(jid)
                            const pacote = await getPacote(jid)
                            const dataEvento = await getdata(jid)
                            SendMessage(atendente, { text: `*Um cliente acabou de solicitar um or??amento.*\n*Informa????es do Evento:*\n\n??????Quantidade de Convidados:\n${qntPessoas}\n??????Local do Evento:\n${localEvento}\n??????Data do Evento:\n${dataEvento}\n??????Pacote:\n${pacote}\n\n*Nome do Cliente:* ${cliente}\n*Link:* https://wa.me/${num_cliente}\n` })
                        })
                    }
                    if(msg.message.buttonsResponseMessage.selectedDisplayText === 'Redes Sociais'){
                        const instagram = {
                            text: "Drinks com um toque de M??gia!?????????????????????\nhttps://www.instagram.com/magodosdrinks/"
                        }
                        SendMessage(jid,instagram)
                    }

            }
                
            // TRATANDO AS LIST RESPONSES
            if(msg.message.listResponseMessage){
                if(msg.message.listResponseMessage.title.includes('pessoas')){
                            
                            delay(1000).then(async function() {
                               const qntPessoas = await setPessoas(msg.message.listResponseMessage.title,jid)
                               console.dir(qntPessoas) 
                            });
                            delay(2000).then(async function(){
                                const qntPessoas = await getPessoas(jid)
                                const localEvento = await getLocal(jid)
                                const pacote = await getPacote(jid)
                                const dataEvento = await getdata(jid)
                                const progress = {
                                    text: `*INFORMA????ES DO SEU EVENTO:*\n??????Quantidade de Convidados:\n${qntPessoas}\n??????Local do Evento:\n${localEvento}\n??????Data do Evento:\n${dataEvento}\n??????Pacote:\n${pacote}`, 
                                }
                            await SendMessage(jid,progress)    
                            });
                            delay(1000).then(async function(){
                            const location = {
                                text: 'Agora informe o *Local* onde ser?? realizado seu Evento.\n(Ex: *End:* Avenida Para??so, 1441 - Espa??o Gil )\n\n_*Obs*.: Para enviar a localiza????o do seu evento, por favor siga o modelo do exemplo colocando antes a palavra *End:* ._?????????????????????'
                            }
                            
                            SendMessage(jid,location)
                            })    
                }
                if (msg.message.listResponseMessage.title.includes('Pacote')) {
                            delay(1000).then(async function () {
                                await setPacote(msg.message.listResponseMessage.title,jid)
                                
                            })
                            delay(2000).then(async function(){
                                const qntPessoas = await getPessoas(jid)
                                const localEvento = await getLocal(jid)
                                const pacote = await getPacote(jid)
                                const dataEvento = await getdata(jid)
                                const progress = {
                                    title: '*Sua solicita????o de Or??amento foi finalizada e enviada para um dos Atendentes!*',
                                    text: `*INFORMA????ES DO SEU EVENTO:*\n??????Quantidade de Convidados:\n${qntPessoas}\n??????Local do Evento:\n${localEvento}\n??????Data do Evento:\n${dataEvento}\n??????Pacote:\n${pacote}`, 
                                    footer: '?? Mago Dos Drinks ?????????????????????',
                                    buttons: confirma,
                                }
                                await SendMessage(jid,progress)    
                            });
                }
            }
            
            
            
            }
        }
   
)}


Connection()