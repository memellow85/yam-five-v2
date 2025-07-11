<script lang="ts" setup >
import { 
  TrophyIcon, 
  BookOpenIcon,
  UserIcon,
  CogIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Squares2X2Icon,
  UserGroupIcon,
  QueueListIcon,
  ExclamationTriangleIcon,
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowsPointingInIcon,
  ArrowUpIcon,
  PlusIcon,
 } from '@heroicons/vue/24/outline'
</script>

<template>
  <section>
    <article>
      <p class="text-sm yf-text-base">{{ $t('guides.text_1') }}</p>
      <div class="mt-2">
        <h4 class="text-base yf-text-base font-semibold">
          {{ $t('guides.title_2') }}
        </h4>
        <p class="text-sm yf-text-base">{{ $t('guides.text_2') }}</p>
      </div>
      <div class="mt-2">
        <h4 class="text-base yf-text-base font-semibold">
          {{ $t('guides.title_7') }}
        </h4>
        <p class="text-sm yf-text-base">{{ $t('guides.text_7') }}</p>
      </div>
      <div class="mt-2">
        <h4 class="text-base yf-text-base font-semibold">
          {{ $t('guides.title_3') }}
        </h4>
        <p class="text-sm yf-text-base">{{ $t('guides.text_3') }}</p>
        <ul class="list-disc text-zinc-600 my-2 ml-6">
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_1_1') }}</i>
              {{ $t('guides.text_3_1_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_2_1') }}</i>
              {{ $t('guides.text_3_2_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_3_1') }}</i>
              {{ $t('guides.text_3_3_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_4_1') }}</i>
              {{ $t('guides.text_3_4_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_5_1') }}</i>
              {{ $t('guides.text_3_5_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_6_1') }}</i>
              {{ $t('guides.text_3_6_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_7_1') }}</i>
              {{ $t('guides.text_3_7_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_8_1') }}</i>
              {{ $t('guides.text_3_8_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_9_1') }}</i>
              {{ $t('guides.text_3_9_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_10_1') }}</i>
              {{ $t('guides.text_3_10_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_11_1') }}</i>
              {{ $t('guides.text_3_11_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_12_1') }}</i>
              {{ $t('guides.text_3_12_2') }}
            </p>
          </li>
          <li>
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_3_13_1') }}</i>
              {{ $t('guides.text_3_13_2') }}
            </p>
          </li>
        </ul>
        <p class="text-sm yf-text-base mb-1.5">{{ $t('guides.text_3_14') }}</p>
        <p class="text-sm yf-text-base mb-1.5">
          <i class="yf-text-base">{{ $t('guides.text_3_15_1') }}</i>
        </p>
        <p class="text-sm yf-text-base">{{ $t('guides.text_3_15_2') }}</p>
        <ul class="list-disc text-zinc-600 my-2 ml-6">
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_1') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_2') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_3') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_4') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_5') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_6') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_7') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_8') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_9') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_10') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_11') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_12') }}</i>
            </p>
          </li>
          <li>
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_13') }}</i>
            </p>
          </li>
        </ul>
        <p class="text-sm yf-text-base mb-1.5">
          <i class="yf-text-base">{{ $t('guides.text_3_16_1') }}</i>
        </p>
        <p class="text-sm yf-text-base mb-1.5">{{ $t('guides.text_3_16_2') }}</p>
        <p class="text-sm yf-text-base mb-1.5">
          <i class="yf-text-base">{{ $t('guides.text_3_17_1') }}</i>
        </p>
        <p class="text-sm yf-text-base mb-1.5">{{ $t('guides.text_3_17_2') }}</p>
        <p class="text-sm yf-text-base mb-1.5">
          <i class="yf-text-base">{{ $t('guides.text_3_18_1') }}</i>
        </p>
        <p class="text-sm yf-text-base">{{ $t('guides.text_3_18_2') }}</p>
        <ul class="list-disc text-zinc-600 my-2 ml-6">
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_13') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_12') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_11') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_10') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_9') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_8') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_7') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_6') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_5') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_4') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_3') }}</i>
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_2') }}</i>
            </p>
          </li>
          <li>
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.game_1') }}</i>
            </p>
          </li>
        </ul>
        <p class="text-sm yf-text-base">{{ $t('guides.text_3_19_1') }}</p>
      </div>
      <div class="mt-2">
        <h4 class="text-base yf-text-base font-semibold">
          {{ $t('guides.title_4') }}
        </h4>
        <p class="text-sm yf-text-base mb-1.5">
          <i class="yf-text-base">{{ $t('guides.text_4_1_1') }}</i>
          {{ $t('guides.text_4_1_2') }}
        </p>
        <p class="text-sm yf-text-base mb-1.5">
          <i class="yf-text-base">{{ $t('guides.text_4_2_1') }}</i>
          {{ $t('guides.text_4_2_2') }}
        </p>
        <p class="text-sm yf-text-base">
          <i class="yf-text-base">{{ $t('guides.text_4_3_1') }}</i>
          {{ $t('guides.text_4_3_2') }}
        </p>
      </div>
      <div class="mt-2">
        <h4 class="text-base yf-text-base font-semibold">
          {{ $t('guides.title_5') }}
        </h4>
        <ul class="mt-1">
          <li class="flex items-center mb-1">
            <CogIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_1') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <Squares2X2Icon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_2') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <TrophyIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_3') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <BookOpenIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_4') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <ArrowDownIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_5') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <ArrowsUpDownIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_6') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <ArrowsPointingInIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_7') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <ArrowUpIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_8') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <PlusIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_9') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <UserIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_10') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <ChartBarIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_11') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <ChatBubbleOvalLeftEllipsisIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_12') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <UserGroupIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_13') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <QueueListIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_14') }}</p>
          </li>
          <li class="flex items-center mb-1">
            <ExclamationTriangleIcon class="w-5 h-5 yf-text-base mr-1" />
            <p class="text-sm yf-text-base">{{ $t('guides.text_5_15') }}</p>
          </li>
        </ul>
      </div>
      <div class="mt-2">
        <h4 class="text-base yf-text-base font-semibold">
          {{ $t('guides.title_6') }}
        </h4>
        <p class="text-sm yf-text-base">{{ $t('guides.text_6_1') }}</p>
        <ul class="list-disc text-zinc-600 my-2 ml-6">
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_6_1_1') }}</i>
            </p>
          </li>
          <li>
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_6_1_2') }}</i>
            </p>
          </li>
        </ul>
        <p class="text-sm yf-text-base">{{ $t('guides.text_6_2') }}</p>
        <ul class="list-disc text-zinc-600 my-2 ml-6">
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_6_2_1_1') }}</i>
              {{ $t('guides.text_6_2_1_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_6_2_2_1') }}</i>
              {{ $t('guides.text_6_2_2_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_6_2_3_1') }}</i>
              {{ $t('guides.text_6_2_3_2') }}
            </p>
          </li>
          <li class="mb-1.5">
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_6_2_4_1') }}</i>
              {{ $t('guides.text_6_2_4_2') }}
            </p>
          </li>
          <li>
            <p class="text-sm yf-text-base">
              <i class="yf-text-base">{{ $t('guides.text_6_2_5_1') }}</i>
              {{ $t('guides.text_6_2_5_2') }}
            </p>
          </li>
        </ul>
        <p class="text-sm yf-text-base mb-6">{{ $t('guides.text_6_3') }}</p>
      </div>
    </article>
  </section>
</template>