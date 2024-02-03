class Animal {
  constructor(name, legCount) {
    this.name = name;
    this.legCount = legCount;
  }
  static myType() {
    console.log("I am type animal");
  }
  describe() {
    return `${this.name} has ${this.legCount} legs`;
  }
}

/*
- Imagine an architect making a blueprint of a building, so the blueprint is the Class we are creating here. Now this blueprint can be used to create as many buildings the architect wants to create (let's say in Rajasthan, Mumbai, Delhi etc.). All these buildings created are therefore known as it's objects. So blueprint is the class which is the structure and objects are buildings which are made based on the make of blueprint


- All functions created inside the class are applicable only for the use by objects. So if I do Animal.describe() then that is invalid because first I need to make an object of Animal. So it should be this way:

let dog = new Animal("dog", 4)
console.log(dog.describe())

But if I use the static keyword before creating a function then I am actually assigning the function to the class meaning that the function would now be applicable for the class (blueprint) and not the object. So I can do Animal.myType()
*/
