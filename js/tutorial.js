    // Show the tutorial div
    // Get a reference to the tutorial div
    const tutorialDiv = document.querySelector('.tutorial');
    
    // Function to show the tutorial div
    function showTutorial() {
      // Show the tutorial div
      tutorialDiv.style.display = 'block';
      tutorialDiv.style.opacity = 0.4;
    
      // Set a timeout to hide the tutorial div after 5 seconds
      const timeout = setTimeout(() => {
        tutorialDiv.style.opacity = 0;
        setTimeout(() => {
          tutorialDiv.style.display = 'none';
        }, 1000); // Wait for the transition to complete
      }, 5000); // 5000 milliseconds = 5 seconds
    
      // Function to reset the timeout
      function resetTimeout() {
        clearTimeout(timeout);
        setTimeout(() => {
          showTutorial();
        }, 10000); // 10000 milliseconds = 10 seconds
        tutorialDiv.style.opacity = 0;
        document.removeEventListener('click', resetTimeout);
        document.removeEventListener('mousemove', resetTimeout);
        document.removeEventListener('touchstart', resetTimeout);
      }
    
      // Add event listeners to reset the timeout if the user interacts with the page
      document.addEventListener('click', resetTimeout);
      document.addEventListener('mousemove', resetTimeout);
      document.addEventListener('touchstart', resetTimeout);
    }
    
    // Call showTutorial function to start the timer
    setTimeout(showTutorial, 10000); // 10000 milliseconds = 10 seconds