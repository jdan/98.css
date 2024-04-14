class A:
    _a = 4   # (protected)
    __b = 9  # (private)
    def show(self):
        print("a =",self._a)
        print("b =",self.__b)

obj=A()
obj.show()
print("outside of the class",A._a)    # (protected)
print("outside of the class",A.__b)   # (private)

print("hello world")
