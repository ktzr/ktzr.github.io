---
layout: post
title: Hello World- Lets start with the basics!
descriptions: My first Blog post, Where i delve into everyone favourite first programing challenge, FizzBuzz.
css: /static/css/syntax.css
---

My first Blog post, I delve into everyone favourite first programing challenge, FizzBuzz.
I'll start from a very bad implementation and make small incremental improvements, and keep going, into the realm of ridiculousness.
All the source code is available [here](https://github.com/ktzr/FizzBuzz).

## The Basics

### What is FizzBuzz?

Its a game made to teach children about, and practice division
and a famous programming challenge/question.

If your a programmer you must have given it a go at least one in your life. 

You sit in a circle and incrementally count from 1 to 100, you say a number then the person next to you says the next number.

**But**
- If a number is divisible by 3 you say `Fizz`
- If a number is divisible by 5 you say `Buzz`
- If a number is divisible by both 3 and 5 you say `FizzBuzz`

# Let's start
## The Naive Ways
### You want me to print every number from 1 to 100? 

```python
def naive_approach_0():
    print("1\n2\nFizz\n4\nBuzz\n"
          "Fizz\n7\n8\nFizz\nBuzz\n"
          "11\nFizz\n13\n14\nFizzBuzz\n"
          "16\n17\nFizz\n19\nBuzz\n"
          "Fizz\n22\n23\nFizz\nBuzz\n"
          "26\nFizz\n28\n29\nFizzBuzz\n"
          "31\n32\nFizz\n34\nBuzz\n"
          "Fizz\n37\n38\nFizz\nBuzz\n"
          "41\nFizz\n43\n44\nFizzBuzz\n"
          "46\n47\nFizz\n49\nBuzz\n"
          "Fizz\n52\n53\nFizz\nBuzz\n"
          "56\nFizz\n58\n59\nFizzBuzz\n"
          "61\n62\nFizz\n64\nBuzz\n"
          "Fizz\n67\n68\nFizz\nBuzz\n"
          "71\nFizz\n73\n74\nFizzBuzz\n"
          "76\n77\nFizz\n79\nBuzz\n"
          "Fizz\n82\n83\nFizz\nBuzz\n"
          "86\nFizz\n88\n89\nFizzBuzz\n"
          "91\n92\nFizz\n94\nBuzz\n"
          "Fizz\n97\n98\nFizz\nBuzz")
```

If you ever get asked to write FizzBuzz, please DON'T do this!

Yes it works, no you won't get the job. 

### Lets use a loop

``` python
def naive_approach_1():
    for i in range(1, 101):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)
```
It's short , it works but it's not pretty, and it's defiantly not DRY

### Let's get rid of fizzbuzz
We don't need to print "FizzBuzz" separately, lets give this a try.

``` python
def naive_approach_2():
    for i in range(1, 101):
        if i % 3 == 0:
            print("Fizz", end="")
        if i % 5 == 0:
            print("Buzz", end="")
        if i % 3 != 0 or i % 5 != 0:
            print(i, end="")
        print()  # dont forget to add the newline```
```
Still not DRY, but a bit better than `naive_approach_1`

### Make it DRY
A DRY program doesn't repeat itself! See more [here](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

Why do we want it to be dry?
So its easier to change to change something in one place then if it where in 10 places.

``` python
def naive_approach_3():
    for i in range(1, 101):
        output = ""
        if i % 3 == 0:
            output += "Fizz"
        if i % 5 == 0:
            output += "Buzz"
        if output == "":
            output += str(i)
        print(output)
```

We also hide the double comparison.
But don't worry its still there, its always hiding somewhere. 
It's  in `output == "" ` to be precise. 

## Getting Better
### Parameters Everywhere
Hey Kevin, what if we need to print fizz when a number is divisible by 7, not 3‽ (It's an interrobang ! + ? = ‽)

Easy fix, we take our best implementation (so far), and parametrise it!


``` python
def lets_add_parameters(length, fizz_number, buzz_number):
    for i in range(1, length + 1):
        output = ""
        if i % fizz_number == 0:
            output += "Fizz"
        if i % buzz_number == 0:
            output += "Buzz"
        if output == "":
            output += str(i)
        print(output)
```

Calling `lets_add_parameters(100, 3, 5)` would have the same effect as the above examples.

Note - if you pass a negative length there will be no output, you can make range count backwards, by setting step=-1 (ranges' 3rd argument)

### WE WANT MORE 
Hey Kevin, turns out fizz needs to print on 3, it's Bazz that needs to print on 7.

Now we can add Bazz very easily, take in a extra parameter `bazz_number` and add this after the Buzz check
```  python
if i % bazz_number == 0:
    output += "Bazz"
```
But this isn't going to work if we keep needing to add new numbers, let's take in the words and there numbers as parameters.


``` python
def what_if_we_want_more_triggers(length, numbers, words):
       for i in range(1, length + 1):
        output = ""
        for number, word in zip(numbers, words):
            if i % number == 0:
                output += word
        if output == "":
            output += str(i)
        print(output)
```
Calling `what_if_we_want_more_triggers(100, [3, 5], ['Fizz', 'Buzz'])` would have the same effect as above.

### Aren't words and numbers related?
Yes!

In the last example we need to pass both a numbers and words argument.
    They are related to each other but that relation cant be seen in our code.
    Let's increase the cohesion of our code, and keep the number and words together
    
    
Now we can create a Class with two fields, but this is python! Lets use a dictionary.

You may jump to a list of dicts e.g. `[{'number':3,'word':'Fizz'},{'number':5,'word':'Buzz'}]` 
    this is effectively the same as using a class

But each number must have a unique word so we can index our dict on the numbers e.g. `{3:'Fizz',5:'Buzz'}`

Kevin why don't we just use a list of tuples?
 
We can, and will, I just like dict's so I put them first.
  As of python 3.6 they take up about as much space as list and are ordered,
  More info in [this](https://www.youtube.com/watch?v=npw4s1QTmPg) Raymond Hettinger talk.


``` python
def numbers_and_words_are_relation_1(length, triggers):
    for i in range(1, length + 1):
        output = ""
        for number, word in triggers.items():
            if i % number == 0:
                output += word
        if output == "":
            output += str(i)
        print(output)
```

Calling `numbers_and_words_are_relation_1(100, {3:'Fizz',5:'Buzz'})` would have the same effect as above.

## I like tuples!
Ehh they are ok, but they aren't dicts.

This is basically the same as the last example but we use a list of tuples, instead of dicts.

``` python
def numbers_and_words_are_relation_2(length, triggers):
    for i in range(1, length + 1):
        output = ""
        for trigger in triggers:
            if i % trigger.number == 0:
                output += trigger.word
        if output == "":
            output += str(i)
        print(output)
```

Calling `numbers_and_words_are_relation_2(100, [(3,'Fizz'),(5,'Buzz')])` would have the same effect as above.


### Kevin we want to use classes!
Ok.

Lets make a quick class
```python
class Trigger:
    def __init__(self,number,word):
        self.number = number
        self.word = word
```
This is basically the same a dictionary `{'number':3,'word':'Fizz'}` but wrapped up in a lovely object.

``` python
def numbers_and_words_are_relation_3(length, triggers):
    for i in range(1, length + 1):
        output = ""
        for number, word in triggers:
            if i % number == 0:
                output += word
        if output == "":
            output += str(i)
        print(output)
```
Calling `numbers_and_words_are_relation_3(100, [Trigger(3,'Fizz'),Trigger(5,'Buzz')])` would have the same effect as above.

## We should stop now
### Nah lets keep going.
Note - Im going to continue from numbers_and_words_are_relation_1 as I like that implantation the most.

Kevin we are bored of doing simple division, we want to say the word, when the square root is divisible by the number!

We can take in the operation as a variable this means we aren't constrained to always doing mod. 
In python you can take functions in as arguments, it's quite a useful feature we are going to make use of here.

We are going to take in a argument `operation` it will be a function that takes in an `int` a `string` and returns a `bool`

So i we wanted to take do our square rooting and devision we would write a function.
```python
def operation(number, trigger): 
    return int(math.sqrt(number)) % trigger == 0
```
We could of cousre write this as a lambda function
```python
operation = lambda number, trigger: int(math.sqrt(number)) % trigger == 0 
```

``` python
def lets_change_the_operation(length, triggers, operation):
    for i in range(1, length + 1):
        output = ""
        for number, word in triggers.items():
            if operation(i, number):
                output += word
        if output == "":
            output += str(i)
        print(output)
```

Calling `lets_change_the_operation(100, {3:'Fizz',5:'Buzz'},lambda number, trigger: number % trigger == 0)` would have the same effect as above.

### Time to add unit tests
Kevin how we meant to test this‽

Our functions doesnt alter state or return anything, we can't test this.
(technically printing to stout is altering state and testable but lets not go down that road)

Easy fix, we return a list of strings, the person calling the function can handle the io.
This also solve the problem of "what if I don't want to print the results"

``` python
def we_cant_test_this(length, triggers, operation):
    output = []
    for i in range(1, length + 1):
        candidate = ""
        for number, word in triggers.items():
            if operation(i, number):
                candidate += word
        if candidate == "":
            candidate += str(i)
        output.append(candidate)
    return output
```
An example test can be found [here](https://github.com/ktzr/FizzBuzz/blob/master/test_fizzbuzz.py).

Calling `we_cant_test_this(100, {3:'Fizz',5:'Buzz'},lambda number, trigger: number % trigger == 0)`
  would have the same effect as above.

## This is too long!

I quite like this implementation.

It's not really an improvement on the above, but it does solve our original requirements.

    
``` python
def one_liner():
    for x in range(100): print(x % 3 // 2 * 'Fizz' + x % 5 // 4 * 'Buzz' or x + 1)
```
- For a sequence of numbers X, for x in X.
- x%n will cycle from 0 to n-1.
- as range starts at 0, the n-1's apreat every n'th index.
- Integer division by n-1 will replace all number less then n-1 with 0 and those equal with 1.
- Multiplying your word by ether 1 or 0, gives the word or the empty string.
- If none if you have the empty sting print x+1 (remember FizzBuzz starts at 1)
- Yes the irony if a 6 lines to explanin 1 line of code is not lost on me.



## Why Did You Write This?
To be honest im not 100% sure.

I started because I want to see how many FizzBuzz implementations I could come up with.
But realised, most implementations follow the same principals, or are slight improvements on each other.

I thought, "Why not structure it as a tutorial, mabey someone will find it useful?". So I did.

## The Implementations Get More Complex as I Go Down.
Yes, in general they get more complex. This however does not mean they are better.
My modifications get a bit ridicules near the end, Im a firm beleiver of [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it), just because they later implementations let you do more, you can always make the changes as you need them.

Implanting things just because you think you are going to need them, will result in a massive waist of time 90% of the time you aren't going to use it and it just bloats your code.
Wait until you need it then implement it.

## I Want More FizzBuzz
- Joel Grus wrote [Fizz Buzz in Tensorflow](tensorflow) and It's well worth a read
- If you need "Enterprise Quality" FizzBuzz check out [FizzBuzz Enterprise Edition](https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition) Its funny and sad at the same time.