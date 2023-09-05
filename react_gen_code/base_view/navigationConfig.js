// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST

{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}


const navigations = [
  {%- for navigation in navigations %}
  {
    title: '{{navigation.title}}',
    href: '{{navigation.path}}',
    icon: {{navigation.icon}},
    {%- if navigation.children %}
    children:[
      {%- for child in navigation.children %}
      { title: '{{child.title}}', href: '{{child.href}}'},
      {%- endfor %}
    ],
    {%- endif %}
  },
  {%- endfor %}    
];

export default navigations;