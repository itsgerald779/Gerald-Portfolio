// fancy-select.js
class FancySelect {
    constructor(selectElement) {
        this.select = selectElement;
        this.options = Array.from(this.select.options);
        this.createCustomSelect();
    }
    
    createCustomSelect() {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select';
        
        // Create button
        this.button = document.createElement('div');
        this.button.className = 'select-btn';
        this.button.textContent = this.select.options[this.select.selectedIndex]?.text || 'Select an option';
        
        // Create dropdown
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'select-dropdown';
        
        // Create search if many options
        if (this.options.length > 10) {
            const search = document.createElement('div');
            search.className = 'select-search';
            search.innerHTML = '<input type="text" placeholder="Search options...">';
            this.dropdown.appendChild(search);
            
            search.querySelector('input').addEventListener('input', (e) => {
                this.filterOptions(e.target.value);
            });
        }
        
        // Add options to dropdown
        this.options.forEach(option => {
            if (!option.disabled) {
                const item = document.createElement('div');
                item.className = 'select-item';
                item.textContent = option.text;
                item.dataset.value = option.value;
                
                if (option.selected) {
                    item.classList.add('selected');
                }
                
                item.addEventListener('click', () => {
                    this.selectOption(option.value);
                    this.button.textContent = option.text;
                    this.dropdown.classList.remove('open');
                    this.button.classList.remove('open');
                });
                
                this.dropdown.appendChild(item);
            }
        });
        
        // Toggle dropdown
        this.button.addEventListener('click', () => {
            this.button.classList.toggle('open');
            this.dropdown.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                this.button.classList.remove('open');
                this.dropdown.classList.remove('open');
            }
        });
        
        // Assemble
        wrapper.appendChild(this.button);
        wrapper.appendChild(this.dropdown);
        
        // Replace original select
        this.select.style.display = 'none';
        this.select.parentNode.insertBefore(wrapper, this.select.nextSibling);
        
        // Update original select when custom select changes
        this.select.addEventListener('change', () => {
            this.button.textContent = this.select.options[this.select.selectedIndex].text;
        });
    }
    
    selectOption(value) {
        this.select.value = value;
        this.select.dispatchEvent(new Event('change'));
        
        // Update selected class in dropdown
        this.dropdown.querySelectorAll('.select-item').forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.value === value) {
                item.classList.add('selected');
            }
        });
    }
    
    filterOptions(searchTerm) {
        const items = this.dropdown.querySelectorAll('.select-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
        });
    }
}

// Initialize fancy selects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-group select').forEach(select => {
        new FancySelect(select);
    });
});