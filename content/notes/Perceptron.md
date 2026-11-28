---
title: "Perceptron Learning Algorithm"
date: 2026-11-28
draft: false
math: true
tags:
  - Machine Learning
---

# Perceptron Learning Algorithm

## Source

- [Cornell CS4780 — The Perceptron](https://www.cs.cornell.edu/courses/cs4780/2023sp/lectures/lecturenote03.html)

## Assumptions

The perceptron learning algorithm as two base assumptions:

1. Data draw is linearly separable.
2. The problem is Binary Classification ($y_i \in \{-1,+1\}$).

## Perceptron Classifier

When the data is linearly separable, the perceptron learning algorithm guarantees a separating hyperplane. The perceptron classifier’s equation is:

$$
H = \{ x : w^T . x + b = 0 \}
$$

for simplicity $x$ can absorb $b$, hence the equation becomes

$$
h(x_i) = \operatorname{sign}(w_t . x)
$$

Note: $y_i(w_t . x) \geq 0$ implies that the classifier as correctly classified the class.

## Why the update helps

Adding a misclassified positive point or subtracting a misclassified negative point helps adjust the separating hyperplane because the update pushes the weight vector in a direction that makes the point more likely to be correctly classified in the next step. If a positive point is misclassified, adding $x$ to $w_t$ moves the hyperplane so that the score for that positive point increases. If a negative point is misclassified, subtracting $x$ from $w_t$ moves the hyperplane so that the score for that negative point decreases. In this way, the update nudges the classifier toward separating the two classes.

## Geometric Intuition

![Perceptron update diagram](/images/notes/perceptron/perceptron-update.png)

*Illustration of a Perceptron update. (Left:) The hyperplane defined by $w_t$ misclassifies one red (-1) and one blue (+1) point. (Middle:) The red point $x$ is chosen and used for an update. Because its label is -1 we need to subtract $x$ from $w_t$. (Right:) The updated hyperplane $w_{t+1} = w_t - x$ separates the two classes and the Perceptron algorithm has converged.*

## Advantage

Advantage of using perceptron is it performs better in higher dimensions as compared to K-NN algorithm.
