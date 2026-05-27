package com.sneha.wms.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Resource Not Found Exception
    @ExceptionHandler(
            ResourceNotFoundException.class)

    public ResponseEntity<
            Map<String, String>>
    handleResourceNotFoundException(

            ResourceNotFoundException ex) {

        Map<String, String> errorResponse =
                new HashMap<>();

        errorResponse.put(
                "message",
                ex.getMessage());

        return new ResponseEntity<>(
                errorResponse,
                HttpStatus.NOT_FOUND);
    }

    // Validation Exception
    @ExceptionHandler(
            MethodArgumentNotValidException.class)

    public ResponseEntity<
            Map<String, String>>
    handleValidationExceptions(

            MethodArgumentNotValidException ex) {

        Map<String, String> errors =
                new LinkedHashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->

                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        ));

        return new ResponseEntity<>(
                errors,
                HttpStatus.BAD_REQUEST);
    }

    // Constraint Violation Exception
    @ExceptionHandler(
            ConstraintViolationException.class)

    public ResponseEntity<
            Map<String, String>>
    handleConstraintViolationException(

            ConstraintViolationException ex) {

        Map<String, String> errors =
                new LinkedHashMap<>();

        ex.getConstraintViolations()
                .forEach(error ->

                        errors.put(
                                error.getPropertyPath()
                                        .toString(),

                                error.getMessage()
                        ));

        return new ResponseEntity<>(
                errors,
                HttpStatus.BAD_REQUEST);
    }
}