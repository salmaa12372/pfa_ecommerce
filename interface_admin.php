<?php
require 'config.php';

// Statistiques
$users = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$products = $pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
$orders = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
$revenue = $pdo->query("SELECT SUM(total) FROM orders WHERE status='DELIVERED'")->fetchColumn();

// Dernières commandes
$latestOrders = $pdo->query("
    SELECT orders.*, users.name 
    FROM orders 
    JOIN users ON orders.id_user = users.id_user
    ORDER BY created_at DESC 
    LIMIT 5
")->fetchAll();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Admin Dashboard</title>

</style>
</head>

<body>

<div class="sidebar">
    <h2>Admin</h2>
    <a href="#">Dashboard</a>
    <a href="#">Produits</a>
    <a href="#">Commandes</a>
    <a href="#">Utilisateurs</a>
    <a href="#">Paiements</a>
</div>

<div class="main">

    <h1>Dashboard</h1>

    <div class="cards">
        <div class="card">
            <h3>Utilisateurs</h3>
            <p><?= $users ?></p>
        </div>

        <div class="card">
            <h3>Produits</h3>
            <p><?= $products ?></p>
        </div>

        <div class="card">
            <h3>Commandes</h3>
            <p><?= $orders ?></p>
        </div>

        <div class="card">
            <h3>Revenu (€)</h3>
            <p><?= $revenue ?? 0 ?></p>
        </div>
    </div>

    <h2>Dernières commandes</h2>

    <table>
        <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
        </tr>

        <?php foreach($latestOrders as $order): ?>
        <tr>
            <td><?= $order['id_order'] ?></td>
            <td><?= $order['name'] ?></td>
            <td><?= $order['total'] ?> €</td>
            <td><?= $order['status'] ?></td>
            <td><?= $order['created_at'] ?></td>
        </tr>
        <?php endforeach; ?>
    </table>

</div>

</body>
</html>