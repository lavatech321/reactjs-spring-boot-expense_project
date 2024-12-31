package com.expense.concur.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "expense_table")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String expense_name;
    private int amount;
    private LocalDate expense_date;

    public Expense(long id, String expense_name, int amount, LocalDate expense_date) {
        this.id = id;
        this.expense_name = expense_name;
        this.amount = amount;
        this.expense_date = expense_date;
    }

    public Expense() {
    }

    public long getId() {
        return this.id;
    }

    public String getExpense_name() {
        return this.expense_name;
    }

    public int getAmount() {
        return this.amount;
    }

    public LocalDate getExpense_date() {
        return this.expense_date;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setExpense_name(String expense_name) {
        this.expense_name = expense_name;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setExpense_date(LocalDate expense_date) {
        this.expense_date = expense_date;
    }
}
