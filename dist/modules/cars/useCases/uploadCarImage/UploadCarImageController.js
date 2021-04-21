"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImageUseCase = require("./UploadCarImageUseCase");

class UploadCarImageController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files;

    const uploadCarImageUseCase = _tsyringe.container.resolve(_UploadCarImageUseCase.UploadCarImageUseCase);

    const images_name = images.map(file => file.filename);
    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name
    });
    return response.status(201).send();
  }

}

exports.UploadCarImageController = UploadCarImageController;