# @willykit-ui/icons

## Установка
```bash
npm install @willykit-ui/icons
```

## Использование

### Базовое использование
```tsx
import { SettingIcon } from '@willykit-ui/icons';

// По умолчанию используется medium размер (16px)
<SettingIcon />

// Установка размера через проп fontSize
<SettingIcon fontSize="small" />  // 12px
<SettingIcon fontSize="medium" /> // 16px (по умолчанию)
<SettingIcon fontSize="large" />  // 20px

// Установка пользовательского размера
<SettingIcon fontSize={24} />     // 24px
```

### Установка цвета
```tsx
<SettingIcon color="red" />
<SettingIcon color="#ff0000" />
<SettingIcon color="var(--primary-color)" />
```

