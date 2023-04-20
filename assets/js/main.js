// JavaScript
const blog_url = suiyan.url
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const modal = document.getElementById('modal');
const resultList = document.getElementById('result-list');

// 读取JSON文件
fetch(blog_url+'blog_data.json')
  .then(response => response.json())
  .then(data => {
    // 处理搜索按钮点击事件
    searchBtn.addEventListener('click', () => {
      const keyword = searchInput.value.trim().toLowerCase();
      const filteredArticles = data.filter(article => {
        return article.title.toLowerCase().includes(keyword);
      });
      // 清空搜索结果列表
      resultList.innerHTML = '';
      // 添加搜索结果到列表中
      if (filteredArticles.length === 0) {
        const li = document.createElement('li');
        li.textContent = '没有搜到相关内容';
        resultList.appendChild(li);
        modal.style.display = 'block';
      } else {
        filteredArticles.forEach(article => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = blog_url+article.url+".html";
          a.target = '_blank';
          a.textContent = article.title;
          li.appendChild(a);
          resultList.appendChild(li);
        });
        modal.style.display = 'block';
      }
    });
  });


  (function (window, document) {
    function getElements() {
      return {
        layout: document.getElementById("layout"),
        menu: document.getElementById("menu"),
        menuLink: document.getElementById("menuLink"),
      };
    }

    function toggleClass(element, className) {
      var classes = element.className.split(/\s+/); //按空格拆分成数组
      //console.log(element,classes);
      var length = classes.length;
      var i = 0;

      for (; i < length; i++) {
        // 如果className存在则删除。
        if (classes[i] === className) {
          classes.splice(i, 1);
          break;
        }
      }
      // 如果不存在则添加className
      if (length === classes.length) {
        classes.push(className);
      }
      // 把class赋值给element
      element.className = classes.join(" ");
      //console.log(element,classes);
    }

    function toggleAll() {
      var active = "active";
      var elements = getElements();

      toggleClass(elements.layout, active);
      toggleClass(elements.menu, active);
      toggleClass(elements.menuLink, active);
    }

    function handleEvent(e) {
      var elements = getElements();

      if (e.target.id === elements.menuLink.id) {
        toggleAll();
        e.preventDefault();
      } else if (elements.menu.className.indexOf("active") !== -1) {
        toggleAll();
      }
    }

    document.addEventListener("click", handleEvent);
  })(this, this.document);
