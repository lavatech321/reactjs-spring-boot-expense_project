package com.expense.concur;

import com.expense.concur.model.Expense;
import com.expense.concur.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class ConcurApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ConcurApplication.class, args);
	}

	@Autowired
	ExpenseRepository expenseRepository;

	@Override
	public void run(String... args) throws Exception {
		Expense e1 = new Expense();
		e1.setAmount(4);
		e1.setExpense_name("Food");
		e1.setExpense_date(LocalDate.now());
		expenseRepository.save(e1);
	}
}
