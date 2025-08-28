

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

     Answer : To create and add a new element in the DOM, we can use document.createElement(). After we make it, we can give it some text or set attributes. Then we can add it to the page with appendChild() or append(). For example, we can make a new and then put it inside the body.

          For Example : let newDiv = document.createElement("div");
                         newDiv.textContent = "I'm new here!";
                         document.body.appendChild(newDiv);


3. What is Event Bubbling and how does it work?

    Answer : Event bubbling means when we click or do an event on a child element, the event goes up step by step to its parent, then to the parent’s parent, and so on. Like if we click a button inside a div, first the button gets the event, then the div, then the document.

       Example : Click a button inside a <div>.

           1. First, the button's clicik runs.
           2. Then the <div> click runs.
           3.Then it keeps going up.


4. What is Event Delegation in JavaScript? Why is it useful?

Answer : Event delegation uses bubbling in a smart way. Instead of putting event listeners on every small child, we put one listener on the parent. Because the event bubbles up, the parent can listen for the child’s events. This saves time and is useful when we add new elements later.


5.What is the difference between preventDefault() and stopPropagation() methods?

Answer : 
        preventDefault() and stopPropagation() are different. preventDefault() stops the normal action of an element. For example, clicking a link normally opens a new page, but if we use preventDefault(), it will not open. stopPropagation() stops the event from moving up to the parent elements. For example, if we click on a button, the event will not go to its parent if we use stopPropagation(). 

       Example : Clicking a button won’t trigger the parent’s click event.



