import jwt from "jsonwebtoken";

const userCheckToken = (req, res, next) => {
  const token = req?.headers?.token?.split(" ")[1]; // Lấy ra token

  try {
    if (!token) {
      return res.status(401).json({
        message: 'Token is missing'
      });
    }

    const jwtObject = jwt.verify(token, process.env.JWT_SECRET); // jwtObject là đối tượng user
    const isExpired = Date.now() >= jwtObject.exp * 1000; // Kiểm tra thời hạn của token

    if (isExpired) {
      return res.status(401).json({
        message: 'Token is expired'
      });
    } else {
      console.log('Done check token');
      next();
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Invalid token'
    });
  }
};



const adminCheckToken = (req, res, next) => {
  const permission = req?.headers?.permission?.split(" ")[0]; // Lấy ra permission
  const token = req?.headers?.token?.split(" ")[1]; // Lấy ra token

  try {
    if (permission && permission === '1') { // So sánh với chuỗi '1'
      if (!token) {
        return res.status(401).json({
          message: 'Token is missing'
        });
      }

      const jwtObject = jwt.verify(token, process.env.JWT_SECRET); // jwtObject là đối tượng user
      const isExpired = Date.now() >= jwtObject.exp * 1000; // Kiểm tra thời hạn của token

      if (isExpired) {
        return res.status(401).json({
          message: 'Token is expired'
        });
      } else {
        console.log('Done check token');
        next();
      }
    } else {
      return res.status(403).json({
        message: 'Permission denied'
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Invalid token'
    });
  }
};

export default {
  userCheckToken,
  adminCheckToken
}