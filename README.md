

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer : getElementById("id") Finds one elements by id. ID are unique, so you will only get one.

       getElementsByClassName("class") Finds all elements with that class. return a live list changes if the page updates.

       querySelector("cssSelector") Finds the first match using CSS rules. For exmple: id, class ,div >p , etc.
       
       querySelectorAll("cssSelector") Finds all matches using CSS rules. Returns a fixed list.

       getElementById = 1 exact thing

      getElementsByClassName = group of things by class

       querySelector = first match with CSS

     querySelectorAll = all matches with CSS


2. How do you create and insert a new element into the DOM?

     Answer : Create it  document.createElement("div").

          Add text or style → newDiv.textContent = "Hello" .

          Put it somewhere → parent.appendChild(newDiv) .

          For Example : let newDiv = document.createElement("div");
                         newDiv.textContent = "I'm new here!";
                         document.body.appendChild(newDiv);


3. What is Event Bubbling and how does it work?

    Answer :  When you click on something inside another element, the event doesn’t stop there.
            It goes from the clicked element  up to its parent  then to the grandparent  and so on.

       Example : Click a button inside a <div>.

      1. First, the button's clicik runs.
      2. Then the <div> click runs.
      3.Then it keeps going up.


4. What is Event Delegation in JavaScript? Why is it useful?

Answer : Instead of putting event listeners on every child (like 100 buttons), you put one listener on the parent.
         When something inside is clicked, you check which child was clicked using event.target.

        1.You don’t need 100 listeners, just 1.

        2.Works even if you add new children later.


5.What is the difference between preventDefault() and stopPropagation() methods?

Answer : 
         preventDefault()  stops the browser’s built-in action.

         Example : A link won’t go to another page, a form won’t submit.

       stopPropagation()  stops the event from bubbling up to parents. 

       Example : Clicking a button won’t trigger the parent’s click event.



