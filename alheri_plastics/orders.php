<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orders</title>
    <link rel="stylesheet" href="./media/CSS/bootstrap.min.css" />
    <link rel="stylesheet" href="./media/font/bootstrap-icons.css" />
    <style>
        .kati{
            height: 120px;
            cursor: pointer;
        }
        .kati:active{
            background-color: rgb(230,230,230);
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand pb-3" style="height: 10vh">
      <div class="container-fluid">
        <span class="navbar-brand ms-2 me-5" href="#">Alheri Plastics</span>
        <button
          class="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto ps-5 ps-md-0">
            <li class="nav-item">
              <a class="nav-link" href="admin.php">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="upload.php">Upload</a>
            </li>
          </ul>
          <form class="d-none d-md-flex w-100 px-5" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search for product"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
<div class="container-fluid">
<div class="row">
    <div class="col-12 col-md-6">
        <div class="row">
        <?php

        $host = "localhost";
        $database = "alheri_plastics";
        $username = "root";
        $password = "";
        $conn = mysqli_connect($host, $username, $password, $database);

        $sql = "SELECT * FROM order_table";
        $result  = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result)){
            while ($row = mysqli_fetch_assoc($result)){
                $product = $row['product'];
                $sql2 = "SELECT image, price, name FROM products WHERE id = $product";
                $result2  = mysqli_query($conn, $sql2);
                $row2 = mysqli_fetch_assoc($result2);
                echo '<div class="col-12 col-md-6 ">
                        <div class="row m-2 shadow rounded-4 p-1 kati" 
                        onclick="open_order(\''.$row['client_name'].'\','.$row['quantity'].',\''.$row2['image'].'\',\''.$row['email'].'\',\''.$row['phone'].'\','.$row2['price'].',\''.$row2['name'].'\')">
                        <div class="col-6" style="height:100%">
                        <img src="./media/images/'.$row2['image'].'" style="height:100%;width:140px;" class="rounded-pill"></div>
                        <div class="col-6 ps-3"><h4>'.$row['client_name'].'<h4>
                        <p class="lead">Quantity: '.$row['quantity'].'</p>
                        </div></div></div>';
            }
        }
        ?>
        </div>
    </div>
    <div class="d-none d-md-grid col-6 p-3 align-content-center gap-4" id="detail" style="height:90vh;overflow-y:scroll;">
        <h3 class="text-center text-muted fw-light">Order Preview</h3>
    </div>
</div>
</div>
<script src="./media/JS/orders.js"></script>
</body>
</html>