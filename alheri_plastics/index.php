<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alheri Plastics</title>
    <link rel="stylesheet" href="./media/CSS/bootstrap.min.css" />
    <style>
      .card-body {
        scrollbar-width: none;
        width: 100%;
        overflow-x: scroll;
        padding: 7px;
      }
      #navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: white;
        z-index: 1000;
      }
      .card {
        margin: 15px 0;
        padding: 0;
        border: none;
      }
      .item {
        height: 250px;
        cursor: pointer;
      }
      img {
        height: 60%;
        display: block;
      }
      .detail {
        height: 40%;
      }
    </style>
  </head>
  <body>
    <nav class="navbar navbar-expand pb-3 border-bottom" id="navbar">
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
              <a class="nav-link" href="#">Support</a>
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
    <div class="container-lg bg-light pt-2 pt-md-0" style="margin-top: 65px">
      <form class="d-flex d-md-none w-100 px-4" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search for product"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div class="row mt-2" id="content">
      <?php

      // CONNECTING TO THE DATABASE
      $host = "localhost";
      $database = "alheri_plastics";
      $username = "root";
      $password = "";
      $conn = mysqli_connect($host, $username, $password, $database);

      // RETRIEVING DATA FROM THE DATABASE
      $sql = "SELECT * FROM products";
      $result  = mysqli_query($conn, $sql);
      if (mysqli_num_rows($result)){
        $cartegories = array();
        while ($row = mysqli_fetch_assoc($result)){
          if (! array_key_exists($row['cartegory'], $cartegories)){
            $cartegories[$row['cartegory']] = array($row['id'] => array("name"=>$row['name'],
                                                                        "price"=>$row['price'],
                                                                        "quantity"=>$row['quantity'],
                                                                        "image"=>$row['image']));
          }else{
            $cartegories[$row['cartegory']][$row['id']] = array("name"=>$row['name'],
                                                                "price"=>$row['price'],
                                                                "quantity"=>$row['quantity'],
                                                                "image"=>$row['image']);
          }
        }
        $content = '';
        foreach($cartegories as $cartegory=>$products){
          $cartegory_name = ($cartegory)? $cartegory : "General";
          $content .= '<div class="card rounded-0">
                      <div class="card-header bg-primary rounded-0">'.$cartegory_name.'</div>
                      <div class="card-body d-flex gap-2">';
          foreach($products as $product=>$description){
            $content .= '<div class="item" onclick="order(\''.$description['name'].'\','.$description["price"].',\''.$description["image"].'\','.$description["quantity"].','.$product.',\''.$cartegory.'\')">
                        <img src="./media/Images/'.$description['image'].'" alt="" />
                        <div class="detail">
                        <h3>'.$description['name'].'</h3>
                        <h4>₦'.$description['price'].'</h4>
                        <p>'.$description['quantity'].' pieces left</p>
                        </div></div>';
          }
          $content .= '</div></div>';
        }
        echo $content;
      };
      ?>
      </div>
    </div>
    <script src="./media/JS/order.js?v=123"></script>
    <script src="./media/JS/bootstrap.bundle.js"></script>
  </body>
</html>
<!-- // echo '<div class="col-6 col-md-2 d-flex gap-4 my-3 my-md-0">
    //         <div class="card">
    //         <div class="card-body">
    //         <img src="./media/images/'. $row['image'] . '" alt="" style="height:150px;width:150px;"/>
    //         <div class="card-text text-center">' . $row['name'] . '</div>
    //         <div class="card-text text-center">' . "N" . $row['price'] . " - " . $row['quantity'] . " Pcs Left" . '</div>
    //         </div>
    //         <div class="card-footer text-center">
    //         <a class="text-decoration-none d-block" href="#" onclick="order(\''.$row['name'].'\','.$row["price"].',\''.$row["image"].'\','.$row["quantity"].','.$row['id'].',\''.$row['cartegory'].'\')">Add to cart</a></div>
    //         </div>
    //         </div>'; -->
