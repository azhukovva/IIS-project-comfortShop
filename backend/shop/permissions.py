from rest_framework import permissions


class IsGroupUserOrReadOnly(permissions.BasePermission):
    group_name = None  

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.groups.filter(name=self.group_name).exists()


class IsAdminOrReadOnly(IsGroupUserOrReadOnly):
    group_name = "admin"


class IsModeratorOrReadOnly(IsGroupUserOrReadOnly):
    group_name = "moderator"


class IsEnterepreneurOrReadOnly(IsGroupUserOrReadOnly):
    group_name = "entrepreneur"

    def has_object_permission(self, request, view, obj):
        return obj.entrepreneur == request.user 


class IsAdminOrModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name__in=['admin', 'moderator']).exists()
