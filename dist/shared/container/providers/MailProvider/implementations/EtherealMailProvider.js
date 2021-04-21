"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class EtherealMailProvider {
  constructor() {
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'marcos.stark27@ethereal.email',
          pass: 'eWvSa9d7yPMU3aTsN6'
        }
      });

      this.client = transporter;
    }).catch(err => console.error(err));
  }

  async sendMail(to, subject, variables, path) {
    const templateFileContent = _fs.default.readFileSync(path).toString('utf-8');

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html: templateHTML
    });
    console.log('Message send: ', message.messageId);
    console.log('Preview URL: ', _nodemailer.default.getTestMessageUrl(message));
  }

}) || _class) || _class) || _class);
exports.EtherealMailProvider = EtherealMailProvider;