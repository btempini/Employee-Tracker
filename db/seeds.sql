INSERT INTO department(id, name) 
VALUES (1, "All"), (2, "Bikes"), (3, "Fishing"), (4, "Camping"), (5, "Toys");


INSERT INTO role(id, title, salary, department_id) 
VALUES (1, "Manager", 80000.00, 1), 
(2, "Salesman", 60000.00, 2), 
(3, "Salesman", 60000.00, 3), 
(4, "Salesman", 60000.00, 4), 
(5, "Salesman", 60000.00, 5), 
(6, "Customer Service", 50000.00, 1);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, "Bryan", "Tempini", 1, null), 
(2, "George", "Bush", 2, 1), 
(3, "Carmen", "SanDiego", 3, 1), 
(4, "Arianna", "Grande", 4, 1), 
(5, "Dick", "Cheney", 5, 1), 
(6, "Joe", "Dirt", 6, 1);
