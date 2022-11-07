<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  mod_tasklist
 *
 * @copyright   (C) 2022 Brian Teeman. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

require ModuleHelper::getLayoutPath('mod_tasklist', $params->get('layout', 'default'));
