<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đặt lại mật khẩu</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 520px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e5e7eb; /* 👈 Thêm border */
      overflow: hidden;
    }
    .header {
      background-color: #6b46c1;
      color: #ffffff;
      text-align: center;
      padding: 24px 0;
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #5a36aa; /* 👈 Thêm border dưới header */
    }
    .content {
      padding: 24px 30px;
      color: #333333;
      line-height: 1.6;
    }
    .content p {
      margin-bottom: 16px;
      font-size: 15px;
    }
    .button {
      display: inline-block;
      background-color: #6b46c1;
      color: white !important;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 15px;
      transition: background-color 0.2s ease-in-out;
      border: 1px solid #553c9a;
    }
    .button:hover {
      background-color: #553c9a;
    }
    .footer {
      text-align: center;
      color: #888888;
      font-size: 13px;
      padding: 18px;
      border-top: 1px solid #e5e7eb;
      background-color: #fafafa;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      Đặt lại mật khẩu
    </div>
    <div class="content">
      <p>Xin chào,</p>
      <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
      <p>Nhấn vào nút bên dưới để tiến hành đặt lại mật khẩu:</p>

      <p style="text-align:center; margin: 24px 0;">
        <a href="http://localhost:5173/user/reset-password?token={{ $token }}&email={{ $email }}" class="button">
          Đặt lại mật khẩu
        </a>
      </p>

      <p>Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này. Liên kết sẽ hết hạn sau một thời gian ngắn vì lý do bảo mật.</p>
      <p>Trân trọng,<br><strong>TK2 - Work Management</strong></p>
    </div>
    <div class="footer">
      © {{ date('Y') }} TK2 - Work Management.
    </div>
  </div>
</body>
</html>
