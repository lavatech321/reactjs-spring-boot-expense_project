package com.expense.concur.controller;

import com.expense.concur.exception.ResourceNotFoundException;
import com.expense.concur.model.Expense;
import com.expense.concur.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/expense")
public class ExpenseController {

    @Autowired
    ExpenseRepository expenseRepository;

    @GetMapping
    public List<Expense> getAllExpense(){
        return expenseRepository.findAll();
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense e1) {
        return expenseRepository.save(e1);
    }

    @GetMapping("{id}")
    public ResponseEntity<Expense> viewExpense(@PathVariable long id) {
        Expense e1 = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense does not exists"));
        return ResponseEntity.ok(e1);
    }

    @PutMapping("{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable long id, @RequestBody Expense e1) {
        Expense updateExp = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense does not exists"));
        updateExp.setExpense_date(e1.getExpense_date());
        updateExp.setAmount(e1.getAmount());
        updateExp.setExpense_name(e1.getExpense_name());
        expenseRepository.save(updateExp);
        return ResponseEntity.ok(updateExp);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteExpense(@PathVariable long id) {
        Expense e1 = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense does not exists"));
        expenseRepository.delete(e1);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllExpense() {
        expenseRepository.deleteAll();
        return ResponseEntity.ok("All records deleted");
    }


}
