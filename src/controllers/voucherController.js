import voucherService from "../service/voucherService.js";

const getVoucher = async (req, res) => {
  try {
    const response = await voucherService.getVoucher();
    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    );
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    );
  }
};

const searchVoucher = async (req, res) => {
  try {
    let keyword = req.query.keyword || "";

    const response = await voucherService.searchVoucher({ keyword });
    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    );
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    );
  }
};

const getVoucherById = async (req, res) => {
  try {
    let idVoucher = req.params.id;

    const response = await voucherService.getVoucherById({ idVoucher });
    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    );
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    );
  }
};


const createVoucher = async (req, res) => {
  try {
    const { title, off, expiration_date } = req.body;

    if (!title || !off || !expiration_date) {
      throw new Error("Input is required");
    }

    const response = await voucherService.createVoucher({ title, off, expiration_date });
    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    );
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    );
  }
};

const updateVoucher = async (req, res) => {
  try {
    const idVoucher = req.params.id;
    const { title, off, expiration_date } = req.body;
    if (!idVoucher) {
      throw new Error('Voucher ID is required');
    }

    const response = await voucherService.updateVoucher({ idVoucher, title, off, expiration_date });

    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    );
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    );
  }
};

const deleteVoucher = async (req, res) => {
  try {
    const idVoucher = req.params.id;
    if (!idVoucher) {
      throw new Error('Voucher ID is required');
    }

    const response = await voucherService.deleteVoucher({ idVoucher });

    return res.status(200).json(
      {
        status: "OK",
        data: response
      }
    );
  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    );
  }
};

export default {
  getVoucher,
  searchVoucher,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher
};
