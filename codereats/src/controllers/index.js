class Controller {
  constructor(service) {
    this.service = service;
  }
  createOne = async (req, res) => {
    const message = "Created!";
    const data = req.body;
    const response = await this.service.createOne(data);
    return res.json201(response, message);
  };
  readOne = async (req, res) => {
    const { id } = req.params;
    const message = "Found!";
    const response = await this.service.readOne(id);
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  readAll = async (req, res) => {
    const data = req.query
    const message = "Found!";
    const response = await this.service.readAll(data);
    if (response.length > 0) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  updateOne = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const message = "Updated!";
    const response = await this.service.updateOne(id, data);
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
  destroyOne = async (req, res) => {
    const { id } = req.params;
    const message = "Deleted!";
    const response = await this.service.destroyOne(id);
    if (response) {
      return res.json200(response, message);
    } else {
      return res.json404();
    }
  };
}

export default Controller;
