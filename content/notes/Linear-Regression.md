---
title: "Linear Regression"
date: 2026-11-24
draft: false
math: true
tags: ["Machine Learning", "Math"]
---

## Source

What I learned or read today:

- [Cornell CS4780 — Lecture 08](https://www.cs.cornell.edu/courses/cs4780/2024sp/lectures/lecturenote08.html)
- [What Could Go Wrong? Linear Regression](https://vkhangpham.medium.com/what-could-go-wrong-linear-regression-517f9823241f)

## My one sentence

Linear regression is a basic machine learning model that learns to fit a line to data points which are scattered across the coordinate plane.

## Supporting paragraph

Let us assume that data is sampled from a set of real numbers and the model follows the equation of a straight line:

$$
y_i = w^T x_i + \epsilon_i
$$

where $\epsilon_i$ is sampled from a mean-zero Gaussian. In other words, the data is sampled from a line $w^T x$ through the origin. For each data point, the label $y_i$ is drawn from a Gaussian with mean $w^T x_i$, our task is to estimate the weights $w$.

MLE is a good tool that can be used to derive a loss function

$$
l(w) = \frac{1}{n}\sum_{i=1}^{n}(x_i^T w-y_i)^2.
$$

Similarly, estimating with MAP adds a regularizing term $\lambda \lVert w\rVert_2^2$ to the loss function, and it’s called ridge regression. 

## Where does Linear Regression fail?

A few common pitfalls for Linear regression are:

- **Non-Linearity:** The data sampled does not contain any linear relationship between features ($x$) and labels ($y$), for example: say the temperature of coffee cooling is noted every minute from when it’s made, initially it steeply cools down but, as time passes cooling slows down.
- **Multicollinearity:** The features observed are highly correlated with each other, example: for a house price predictor model, the number of rooms and the square footage might give similar information which might steer the model away from generalizability.
- **Autocorrelation:** The data points sampled are not independent from one another. The core assumption of Linear regression is that the errors are I.I.D. example: Daily weather and stock market data are common examples of auto correlation.
- **Omitted-Variable Bias:** While omitting one variable such as square footage from the house price predictor solve Multicollinearity, this approach can introduce bias.
- **Correlation ≠ causation:** The features in the dataset might have high correlation but they are not direct causation of the case. example: The ice creams sales during summer and the drowning deaths might have high correlation.
- **Reverse Causation:** In this scenario, the features ($X$) might be used to infer the Result ($Y$), but the Results ($Y$) might infer the features ($X$). For example, in a citywide crime report regression, the number of police officers ($X$) and the crime rate ($Y$) might show a positive correlation, leading one to assume $X \rightarrow Y$ (i.e., hiring more police officers increases the crime rate). In reality, $Y \rightarrow X$: a higher crime rate leads to hiring more police officers.
