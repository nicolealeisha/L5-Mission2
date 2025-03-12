const express = require('express');
const app4 = express();

app4.use(express.json());

app4.post('/api/discount', (req, res) => {
    try {
        const { age, experience } = req.body;

        // Validate inputs are present
        if (age === undefined || experience === undefined) {
            return res.status(400).json({ error: "age and experience are required" });
        }

        // Validate inputs are numbers
        if (typeof age !== 'number' || typeof experience !== 'number') {
            return res.status(400).json({ error: "age and experience must be numbers" });
        }

        // Validate inputs are non-negative
        if (age < 0 || experience < 0) {
            return res.status(400).json({ error: "age and experience cannot be negative" });
        }

        // Validate age is reasonable
        if (age > 120) {
            return res.status(400).json({ error: "invalid age" });
        }

        // Validate experience makes sense with age
        if (experience > age - 16) {
            return res.status(400).json({ error: "driving experience cannot be greater than age minus 16" });
        }

        // Calculate discount rate
        let discount_rate = 0;

        // Age-based discounts
        if (age >= 40) {
            discount_rate += 10; // 5% for 25+ and additional 5% for 40+
        } else if (age >= 25) {
            discount_rate += 5;
        }

        // Experience-based discounts
        if (experience >= 10) {
            discount_rate += 10; // 5% for 5+ years and additional 5% for 10+ years
        } else if (experience >= 5) {
            discount_rate += 5;
        }

        // Maximum discount cap
        discount_rate = Math.min(discount_rate, 20);

        res.json({ discount_rate });

    } catch (error) {
        res.status(500).json({ error: "there is an error" });
    }
});

module.exports = app4;