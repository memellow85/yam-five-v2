<script lang="ts" setup>
interface ResultInterface {
  data: any
  noborder?: boolean
}
const props = defineProps<ResultInterface>()
</script>

<template>
  <div class="grid grid-cols-2 gap-3 mb-2">
    <div>
      <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box1') }}:</span> {{ props.data.extra.box1 }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.over_60') }}: {{ props.data.extra.bonus_over_60 }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.over_70') }}: {{ props.data.extra.bonus_over_70 }}</p>
    </div>
    <div>
      <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box2') }}:</span> {{ props.data.extra.box2 }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.min_max') }}: {{ props.data.extra.bonus_min_max }}</p>
    </div>
  </div>
  <div 
    :class="['grid grid-cols-2 gap-3 mb-3 pb-3', {
      'border-b border-slate-200' : !props.noborder
    }]">
    <div>
      <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box3') }}:</span> {{ props.data.extra.box3 }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.eleven') }}: {{ props.data.extra.bonus_eleven }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.full') }}: {{ props.data.extra.bonus_full }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.poker') }}: {{ props.data.extra.bonus_poker }}</p>
    </div>
    <div>
      <p class="text-base yf-text-base"><span class="font-bold">{{ $t('group.box4') }}:</span> {{ props.data.extra.box4 }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.scale') }}: {{ props.data.extra.bonus_scale }}</p>
      <p class="text-base yf-text-base">{{ $t('bonus.yam') }}: {{ props.data.extra.bonus_yam }}</p>
    </div>
  </div>
</template>
