<!-- Hero Section -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,16,20,24&height=280&section=header&text=🛒%20Shopping%20List&fontSize=80&fontColor=fff&animation=fadeIn&fontAlignY=40"/>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&duration=4000&pause=1000&color=4169E1&center=true&vCenter=true&repeat=true&width=900&height=100&lines=Complete+CRUD+Management+System+📝;Pure+JavaScript+Implementation+⚡;REST+API+Integration+🔌;Academic+Web+Technology+Project+🎓" alt="Typing SVG" />

<br><br>

![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge&logo=checkmarx)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<br>

**Complete shopping list management system with CRUD operations, data persistence, and REST API integration**

[🎯 About](#-about) • [✨ Features](#-features) • [🏗️ Architecture](#️-architecture) • [🚀 Getting Started](#-getting-started) • [📚 Learning](#-learning-outcomes)

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- About -->
## 🎯 **About**

<table>
<tr>
<td width="60%">

### 📋 **The Project**

A **complete shopping list management system** developed as an academic project for the Web Technology course. The system implements full CRUD operations, data persistence, and REST API integration using exclusively **HTML, CSS, and vanilla JavaScript** - no frameworks or libraries.

**Key Challenge:** Build a robust web application following industry standards while using only pure web technologies.

**Solution:** Modern JavaScript ES6+, LocalStorage for offline persistence, and RESTful API integration for data synchronization.

</td>
<td width="40%">

<img src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif" width="100%">

</td>
</tr>
</table>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Features -->
## ✨ **Features**

<div align="center">

### **Academic Requirements Compliance**

<table>
<tr>
<th>Requirement</th>
<th>Status</th>
<th>Implementation</th>
</tr>
<tr>
<td>Pure HTML/CSS/JS</td>
<td>✅ Complete</td>
<td>No frameworks or libraries used</td>
</tr>
<tr>
<td>Two pages (register & list)</td>
<td>✅ Complete</td>
<td><code>cadastro.html</code> and <code>lista.html</code></td>
</tr>
<tr>
<td>External CSS/JS files</td>
<td>✅ Complete</td>
<td><code>styles.css</code> and <code>.js</code> files</td>
</tr>
<tr>
<td>Product CRUD</td>
<td>✅ Complete</td>
<td>Create, Read, Update, Delete operations</td>
</tr>
<tr>
<td>Field validation</td>
<td>✅ Complete</td>
<td>Required fields and format validation</td>
</tr>
<tr>
<td>LocalStorage persistence</td>
<td>✅ Complete</td>
<td><code>listaProdutos</code> and <code>listaCompras</code></td>
</tr>
<tr>
<td>API integration</td>
<td>✅ Complete</td>
<td>MockAPI with Parent-Child relationships</td>
</tr>
<tr>
<td>Server submission</td>
<td>✅ Complete</td>
<td>POST with all collected items</td>
</tr>
</table>

</div>

### 🎯 **Core Functionality**

<table>
<tr>
<td width="50%">

#### **Product Management**
- 📝 **Create**: Add new products to catalog
- 📋 **Read**: View all registered products
- ✏️ **Update**: Edit product information
- 🗑️ **Delete**: Remove products from system
- 🔍 **Validation**: Automatic field validation
- 🔢 **Auto-ID**: Automatic code generation

</td>
<td width="50%">

#### **Shopping List**
- 🛒 **Sync**: Auto-sync with product catalog
- ➕ **Quantity Control**: Increase/decrease items
- ✅ **Auto-complete**: Mark as collected automatically
- 📊 **Progress Tracking**: Visual completion status
- 🔄 **Real-time Updates**: Instant UI feedback
- 📤 **Server Sync**: Send completed list to API

</td>
</tr>
</table>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Architecture -->
## 🏗️ **Architecture**

<div align="center">

### **System Flow**

```mermaid
graph LR
    A[📝 Product Register] -->|Save| B[💾 LocalStorage]
    B -->|Sync| C[🛒 Shopping List]
    C -->|Collect Items| D[✅ Complete]
    D -->|Send| E[🌐 REST API]
    E -->|Response| F[📊 History]
    
    style A fill:#4169E1,stroke:#1E3A8A,color:#fff
    style B fill:#10B981,stroke:#059669,color:#fff
    style C fill:#F59E0B,stroke:#D97706,color:#fff
    style D fill:#8B5CF6,stroke:#6D28D9,color:#fff
    style E fill:#EF4444,stroke:#DC2626,color:#fff
    style F fill:#6366F1,stroke:#4F46E5,color:#fff
```

</div>

### 📁 **Project Structure**

```
📦 shopping-list-system/
 ┃
 ┣ 📄 cadastro.html          ← Product management page
 ┣ 📄 lista.html             ← Shopping list page
 ┃
 ┣ 📜 cadastro.js            ← CRUD logic & validations
 ┣ 📜 lista.js               ← Shopping control & API integration
 ┃
 ┗ 🎨 styles.css             ← Complete styling
```

### 💾 **Data Architecture**

<div align="center">

```
┌─────────────────────────────────────────────┐
│           LocalStorage Layer                │
├─────────────────────────────────────────────┤
│  listaProdutos    │  Product Catalog        │
│  listaCompras     │  Shopping List          │
│  historicoEnvios  │  Submission History     │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│              REST API Layer                 │
├─────────────────────────────────────────────┤
│  /Compras              │  Shopping records  │
│  /Compras/{id}/produtos│  Product items     │
└─────────────────────────────────────────────┘
```

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Technologies -->
## 🛠️ **Technologies**

<div align="center">

### **Pure Web Stack**

<table>
<tr>
<td align="center" width="33%">

### 📝 **Frontend**

![HTML5](https://skillicons.dev/icons?i=html)
![CSS3](https://skillicons.dev/icons?i=css)
![JavaScript](https://skillicons.dev/icons?i=js)

**HTML5 Semantic**  
**CSS3 Modern**  
**JavaScript ES6+**

</td>
<td align="center" width="33%">

### 💾 **Storage**

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="80">

**LocalStorage API**  
Client-side persistence  
JSON data format

</td>
<td align="center" width="33%">

### 🔌 **Integration**

<img src="https://static-00.iconduck.com/assets.00/api-icon-2048x2048-wo5ifcfl.png" width="80">

**Fetch API**  
REST architecture  
MockAPI service

</td>
</tr>
</table>

### ⚡ **JavaScript Features**

![ES6+](https://img.shields.io/badge/Arrow_Functions-✅-success?style=for-the-badge)
![Async](https://img.shields.io/badge/Async%2FAwait-✅-success?style=for-the-badge)
![Array](https://img.shields.io/badge/Array_Methods-✅-success?style=for-the-badge)
![Template](https://img.shields.io/badge/Template_Literals-✅-success?style=for-the-badge)
![Destructuring](https://img.shields.io/badge/Destructuring-✅-success?style=for-the-badge)

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Key Features -->
## 🎯 **Key Features Breakdown**

<div align="center">

### **Smart Automation**

</div>

<table>
<tr>
<td width="50%">

### 🔢 **Auto ID Generation**

- **Sequential numbering**: 1, 2, 3...
- **No duplicates**: Guaranteed unique IDs
- **Gap handling**: Works after deletions
- **Auto-increment**: Always next available

</td>
<td width="50%">

### 🔄 **Auto Synchronization**

- **Real-time sync**: Product ↔ Shopping list
- **Add detection**: New products auto-added
- **Update propagation**: Changes reflected instantly
- **Delete cleanup**: Removed items cleared

</td>
</tr>
<tr>
<td width="50%">

### ✅ **Smart Collection**

- **Auto-mark**: Completes when quantity reached
- **Visual feedback**: Strikethrough completed items
- **Progress tracking**: Real-time completion status
- **Button control**: Enable submit when all collected

</td>
<td width="50%">

### 🔌 **API Integration**

- **REST architecture**: Parent-Child relationships
- **Batch submission**: All items in one transaction
- **Error handling**: Graceful failure management
- **History tracking**: Complete submission log

</td>
</tr>
</table>

### 📊 **Data Management**

<div align="center">

| Feature | Description | Benefit |
|---------|-------------|---------|
| **LocalStorage** | Client-side persistence | Offline functionality |
| **JSON Format** | Structured data storage | Easy manipulation |
| **Validation** | Input verification | Data integrity |
| **Barcode Support** | EAN-13 format | Product identification |
| **Unit System** | Multiple units (kg, lt, un) | Flexible measurement |

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Getting Started -->
## 🚀 **Getting Started**

<div align="center">

### **Quick Setup**

</div>

### 📋 **Prerequisites**

- 🌐 Modern web browser (Chrome, Firefox, Safari, Edge)
- 📝 Text editor (optional, for code viewing)
- 🔌 Internet connection (for API features)

### ⚡ **Installation**

<table>
<tr>
<td width="50%" align="center">

### 1️⃣ **Clone Repository**

```bash
git clone https://github.com/
joaogalimberti/
shopping-list-system.git

cd shopping-list-system
```

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />

</td>
<td width="50%" align="center">

### 2️⃣ **Open in Browser**

```bash
# Direct file opening
open cadastro.html

# Or use local server
python -m http.server 8000
```

<img src="https://img.shields.io/badge/Browser-Ready-success?style=for-the-badge&logo=googlechrome" />

</td>
</tr>
</table>

### 🎮 **Usage Flow**

<div align="center">

```
1️⃣ Open cadastro.html
         ↓
2️⃣ Register products (name, unit, quantity, barcode)
         ↓
3️⃣ Open lista.html
         ↓
4️⃣ Increase quantities as you shop
         ↓
5️⃣ Items auto-mark as collected
         ↓
6️⃣ Submit to server when complete
```

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Learning Outcomes -->
## 📚 **Learning Outcomes**

<div align="center">

### **Academic Skills Development**

</div>

<table>
<tr>
<td width="50%">

### 💻 **Technical Skills**

- ✅ **JavaScript ES6+**: Modern syntax and features
- ✅ **DOM Manipulation**: Dynamic content updates
- ✅ **Event Handling**: User interaction management
- ✅ **AJAX/Fetch**: Asynchronous HTTP requests
- ✅ **LocalStorage**: Client-side data persistence
- ✅ **REST APIs**: HTTP methods and integration
- ✅ **JSON**: Data format and parsing
- ✅ **Form Validation**: Input verification

</td>
<td width="50%">

### 🧠 **Programming Concepts**

- ✅ **CRUD Operations**: Create, Read, Update, Delete
- ✅ **Data Structures**: Arrays, Objects, JSON
- ✅ **Async Programming**: Promises, async/await
- ✅ **Error Handling**: Try-catch blocks
- ✅ **Code Organization**: Modular functions
- ✅ **State Management**: Application state control
- ✅ **API Integration**: Client-server communication
- ✅ **Design Patterns**: Best practices implementation

</td>
</tr>
</table>

### 🎯 **Applied Concepts**

<div align="center">

| Concept | Implementation | Learning Value |
|---------|----------------|----------------|
| **MVC Pattern** | Separation of concerns | Code organization |
| **RESTful APIs** | HTTP methods (GET, POST) | Client-server architecture |
| **AJAX** | Fetch API | Asynchronous communication |
| **Persistence** | LocalStorage | Data management |
| **Validation** | Form validation | Data integrity |
| **Responsive Design** | CSS3 | Modern UI/UX |

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Academic Context -->
## 🎓 **Academic Context**

<div align="center">

### **Web Technology Course Project**

</div>

<table>
<tr>
<td width="50%">

### 📚 **Course Information**

**Program:** Systems Analysis and Development  
**Course:** Web Technology  
**Institution:** UCL University  
**Year:** 2024

**Objective:** Develop a complete web application using only vanilla web technologies (HTML, CSS, JavaScript)

</td>
<td width="50%">

### 🎯 **Project Goals**

- Implement CRUD operations
- Practice DOM manipulation
- Learn API integration
- Apply data persistence
- Follow web standards
- Write clean, maintainable code

</td>
</tr>
</table>

### 🏆 **Project Achievements**

<div align="center">

![Requirements](https://img.shields.io/badge/Requirements-100%25_Met-success?style=for-the-badge)
![Code Quality](https://img.shields.io/badge/Code_Quality-High-blue?style=for-the-badge)
![Documentation](https://img.shields.io/badge/Documentation-Complete-green?style=for-the-badge)

</div>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Features Demo -->
## 🎬 **Features Overview**

<div align="center">

### **System Capabilities**

</div>

### 📝 **Product Management Page**

<table>
<tr>
<td width="50%">

#### **Registration Form**
- Product name (required)
- Unit selection (kg, lt, un, mt, pc)
- Quantity (positive numbers)
- Barcode (EAN-13, optional)
- Auto-generated product code

</td>
<td width="50%">

#### **Product List**
- View all registered products
- Edit product information
- Delete products
- Real-time updates
- Sorted by product code

</td>
</tr>
</table>

### 🛒 **Shopping List Page**

<table>
<tr>
<td width="50%">

#### **Interactive List**
- Synced with product catalog
- Quantity controls (+/-)
- Manual quantity input
- Visual completion indicators
- Strikethrough completed items

</td>
<td width="50%">

#### **Submission System**
- Collect all items requirement
- Submit to REST API
- Automatic history logging
- Success/error notifications
- Clear after submission

</td>
</tr>
</table>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Contributing -->
## 🤝 **Contributing**

<div align="center">

**Contributions and suggestions are welcome!**

</div>

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/NewFeature

# 3. Commit your changes
git commit -m 'feat: Add NewFeature'

# 4. Push to the branch
git push origin feature/NewFeature

# 5. Open a Pull Request
```

### 💡 **Improvement Ideas**

- 📱 Mobile app version
- 🔍 Search and filter functionality
- 📊 Shopping statistics
- 🏪 Store location integration
- 💰 Price tracking
- 🔔 Low stock notifications

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

<!-- Contact -->
## 📬 **Contact**

<div align="center">

### **Let's Connect!**

[![Email](https://img.shields.io/badge/Email-joaogalimberti@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joaogalimberti@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-João_Galimberti-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joaogalimberti/)
[![GitHub](https://img.shields.io/badge/GitHub-joaogalimberti-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/joaogalimberti)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,16,20,24&height=150&section=footer"/>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=4169E1&center=true&vCenter=true&width=800&lines=🛒+Practical+web+development+with+pure+JavaScript;📝+CRUD+operations+and+API+integration+mastered;💡+Building+real-world+applications+from+scratch" alt="Footer" />

**Developed with 💙 by [João Galimberti](https://github.com/joaogalimberti) | UCL University | 2025**

*Academic project demonstrating modern web development fundamentals*

</div>
