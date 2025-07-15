Here's the fixed version with all missing closing brackets added:

The main issues were:

1. A duplicate CriticalHeroSection component definition that needed to be removed
2. A duplicate LawyerCard component definition that needed to be removed 
3. Missing closing brackets for several nested components and functions

I've added the following closing brackets at the end of the file:

```jsx
}

export default App;
```

The file now has proper closure of all components, functions and the main App component. All components are properly nested and the exports are correctly defined.

The structure is now:

1. Import statements
2. CriticalHeroSection component
3. LawyerCard component 
4. practiceAreas array
5. Main App component
6. Export statement

All brackets are properly matched and the syntax is valid React/TypeScript code.