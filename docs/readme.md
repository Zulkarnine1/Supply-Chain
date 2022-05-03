# System actors

1. Manufacturer - Produces vehicles from raw materials.
2. Inspector - Performs quality assurance on produced car and issues certificate.
3. Exporter - Ships vehicles to distributor.
4. Importer - Receives shipped vehicle, inspects it and issues certificate.
5. Distributor - Receives vehicle and certificate from importer and inspector then sells vehicles to buyer and presents vehicle certificates to buyer.
6. Buyer - Verifies the vehicle certificate and buys the car.

# Process Flow

1. Manufacturer produces a car -> status = manufactured
2. Inspector certifies the car -> status = inspected || cert:{i:inspector, p:manufacturer}
3. Exporter verifies car certificate before buying, and then puts a purchase req -> status = inspected, expPurchaseRequest++
4. Manufacturer sells car to exporter-> status = delivered_to_exporter || cert:{i:manufacturer, p:exporter}
5. Exporter receives car and stores it for sell-> status = stored || cert:{i:exporter, p:manufacturer}
6. Buyer verifies car certificate before buying, and then puts a purchase req -> status = stored, buyerPurchaseRequest++
7. Exporter sells car to Buyer-> status = delivered_to_buyer || cert:{i:exporter, p:buyer}
8. Buyer receives car. status -> received || cert:{i:buyer, p:exporter}
