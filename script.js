const people = [
    { 
        id: 1,
        name: 'John Doe',
        specialty: 'طبيب عام',
        region: 'الرياض',
        workplace: 'مستشفى الرياض',
        doctorNumber: '123456789',
        workerNumber: '987654321',
        yearsOfExperience: 5,
        schedule: ['الأحد: 9 صباحاً - 5 مساءً', 'الاثنين: 9 صباحاً - 5 مساءً'],
        mapLocation: '24.7136,46.6753',
        image: 'https://picsum.photos/200/300'
    },
    { 
        id: 2,
        name: 'Jane Doe',
        specialty: 'طبيب أسنان',
        region: 'جدة',
        workplace: 'عيادة جدة للأسنان',
        doctorNumber: '1122334455',
        workerNumber: '5566778899',
        yearsOfExperience: 3,
        schedule: ['الثلاثاء: 10 صباحاً - 6 مساءً', 'الأربعاء: 10 صباحاً - 6 مساءً'],
        mapLocation: '21.2854,39.2376',
        image: 'https://picsum.photos/200/301'
    },
    { 
        id: 3,
        name: 'Jane Doe',
        specialty: 'طبيب أسنان',
        region: 'جدة',
        workplace: 'عيادة جدة للأسنان',
        doctorNumber: '1122334455',
        workerNumber: '5566778899',
        yearsOfExperience: 3,
        schedule: ['الثلاثاء: 10 صباحاً - 6 مساءً', 'الأربعاء: 10 صباحاً - 6 مساءً'],
        mapLocation: '21.2854,39.2376',
        image: 'https://picsum.photos/200/301'
    }
   
    
];

const resultsDiv = document.getElementById('results');
const searchInput = document.getElementById('search-input');
const jobSelect = document.getElementById('job-select'); // الحصول على قائمة الاختصاصات

// عرض النتائج
const displayResults = (results) => {
    resultsDiv.innerHTML = results.map(person => `
        <div class="card">
            <div class="flex">
                <img src="${person.image}" alt="صورة" />
                <div class="info">
                    <h2 onclick="searchByText('${person.name}')">${person.name}</h2>
                    <p>الاختصاص: ${person.specialty}</p>
                    <p onclick="searchByText('${person.region}')">المنطقة: ${person.region}</p>
                    <button onclick="toggleDetails(${person.id})">أكثر</button>
                    <div id="details-${person.id}" class="details" style="display:none;">
                        <p>الاسم: ${person.name}</p>
                        <p>الاختصاص: ${person.specialty}</p>
                        <p>المنطقة: ${person.region}</p>
                        <p>موقع العمل: ${person.workplace}</p>
                        <p>رقم الطبيب: ${person.doctorNumber}</p>
                        <p>رقم الحجز: ${person.workerNumber}</p>
                        <p>سنوات الخبرة: ${person.yearsOfExperience}</p>
                        <div class="schedule-container">
                            <button onclick="toggleSchedule(${person.id})">المواعيد</button>
                            <ul id="schedule-${person.id}">
                                ${person.schedule.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                            <button onclick="openMap('${person.mapLocation}')">الموقع على الخريطة</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
};

// البحث بناءً على النص المدخل أو التخصص
const filterResults = () => {
    const query = searchInput.value.toLowerCase();
    const selectedSpecialty = jobSelect.value;

    const filteredPeople = people.filter(person => 
        (person.name.toLowerCase().includes(query) || 
        person.region.toLowerCase().includes(query)) &&
        (selectedSpecialty === '' || person.specialty === selectedSpecialty)
    );

    displayResults(filteredPeople);
};

// تحديث مربع البحث وتنفيذ البحث
const searchByText = (text) => {
    searchInput.value = text;  // وضع النص في مربع البحث
    filterResults();  // تنفيذ البحث مباشرة
};

// التبديل بين عرض التفاصيل
const toggleDetails = (id) => {
    const detailsDiv = document.getElementById(`details-${id}`);
    detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
};

// التبديل بين عرض المواعيد
const toggleSchedule = (id) => {
    const scheduleDiv = document.getElementById(`schedule-${id}`);
    const scheduleContainer = scheduleDiv.parentElement;
    scheduleContainer.classList.toggle('active');
};

// فتح الموقع على الخريطة
const openMap = (location) => {
    window.open(`https://www.google.com/maps?q=${location}`, '_blank');
};

// استدعاء عرض النتائج الأولية
displayResults(people);

// إضافة حدث لتنفيذ البحث عند الكتابة
searchInput.addEventListener('input', filterResults);

// إضافة حدث لتنفيذ البحث عند تغيير التخصص
jobSelect.addEventListener('change', filterResults);
