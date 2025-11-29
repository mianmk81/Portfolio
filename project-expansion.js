// Project Expansion Functionality
document.addEventListener('DOMContentLoaded', function() {
  initProjectExpansion();
});

function initProjectExpansion() {
  const expandBtn = document.querySelector('.expand-projects-btn');
  const expandableProjects = document.getElementById('expandable-projects');
  const arrow = document.getElementById('projects-arrow');
  const label = document.getElementById('projects-btn-label');
  
  if (!expandBtn || !expandableProjects || !arrow || !label) {
    return;
  }
  
  // Ensure initial state is properly set
  expandableProjects.style.display = 'grid';
  expandableProjects.classList.add('hidden');
  
  expandBtn.addEventListener('click', function() {
    if (expandableProjects.classList.contains('hidden')) {
      // First add the expanded class to trigger the transition
      expandableProjects.classList.add('expanded');
      
      // Then remove the hidden class after a tiny delay to ensure transition works
      setTimeout(() => {
        expandableProjects.classList.remove('hidden');
      }, 10);
      
      // Update arrow and label
      arrow.classList.remove('fa-angle-down');
      arrow.classList.add('fa-angle-up');
      label.textContent = 'Collapse Projects';
    } else {
      // First remove the expanded class
      expandableProjects.classList.remove('expanded');
      
      // Then add the hidden class
      expandableProjects.classList.add('hidden');
      
      // Update arrow and label
      arrow.classList.remove('fa-angle-up');
      arrow.classList.add('fa-angle-down');
      label.textContent = 'Expand Projects';
    }
  });
}
