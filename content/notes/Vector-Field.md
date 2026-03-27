---
title: 'Vector Field'
date: '2026-03-27T15:29:40+05:30'
draft: false
---

<figure style="text-align: center;">
  <video autoplay loop muted playsinline width="800" style="max-width: 100%; height: auto;">
    <source src="/videos/Vector_Field.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Visualization of a vector field built using Manim. Taken inspiration from <a href=https://anvaka.github.io/fieldplay/?cx=0.22734999999999994&cy=-0.7046000000000001&w=11.858899999999998&h=11.858899999999998&fo=0.998&dp=0.009&dt=0.01&cm=1&vf=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v.x%20%3D%20%20p.y%3B%0A%20%20v.y%20%3D%20%20-p.x%3B%0A%0A%20%20return%20v%3B%0A%7D&code=%2F%2F%20p.x%20and%20p.y%20are%20current%20coordinates%0A%2F%2F%20v.x%20and%20v.y%20is%20a%20velocity%20at%20point%20p%0Avec2%20get_velocity%28vec2%20p%29%20%7B%0A%20%20vec2%20v%20%3D%20vec2%280.%2C%200.%29%3B%0A%0A%20%20%2F%2F%20change%20this%20to%20get%20a%20new%20vector%20field%0A%20%20v.x%20%3D%20%20p.y%3B%0A%20%20v.y%20%3D%20%20p.x%3B%0A%0A%20%20return%20v%3B%0A%7D>here</a></figcaption>
</figure>
In simple terms, a vector field assigns every point (x,y) in a region a vector pointing in a certain direction, and when you input a point into a vector field, you get a vector function. 

**Definition**: Let $R$ be the region in the $xy$ plane. A Vector Field $\vec{F}$ assigns every point $(x,y)$ in $R$ a vector $\vec{F}(x,y)$ with two components.

$$
\vec{F} = M(x,y)\hat{i} + N(x,y)\hat{j}
$$

This plane vector field involves two functions of two variables. They are the
components $M$ and $N$, which vary from point to point. A vector has fixed
components; a vector field has varying components.

## Intution

A real-life example of a vector field is wind blowing down the street. Every point in the street has its own wind velocity. If you walk with the wind, it does positive work; if you walk against it, it does negative work; and if you walk sideways, you're not affected (zero work relative to the wind).


